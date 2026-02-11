import type { ParsingTypeValue } from "@cookmate/domain/shared";
import { getParsingJobSelect } from "@/infra/db/repositories/parsing/get-parsing-job";
import { updateParsingJob } from "@/infra/db/repositories/parsing/update-parsing-job";
import { parserFactory } from "./parser-factory.service";
import { parsingEventsGateway } from "./parsing-events-gateway.service";

class ParsingOrchestrator {
  async process(jobId: string, type: ParsingTypeValue, input: unknown): Promise<void> {
    try {
      // 1. Fetch job (verify it exists)
      const job = await getParsingJobSelect({ id: jobId }, { id: true, status: true });

      if (job.status !== "QUEUED") {
        throw new Error(`Job ${jobId} is not in QUEUED status (current: ${job.status})`);
      }

      // 2. Update status: PROCESSING
      await updateParsingJob(
        { id: jobId },
        {
          status: "PROCESSING",
          startedAt: new Date(),
        },
        { id: true },
      );

      // 3. Get parser from factory
      const parser = parserFactory.getParser(type);

      // 4. Parse (emits progress automatically via BaseParser)
      const result = await parser.parse(jobId, input);

      // 5. Update job: COMPLETED + result
      await updateParsingJob(
        { id: jobId },
        {
          status: "COMPLETED",
          result: result,
          completedAt: new Date(),
        },
        { id: true },
      );

      // 6. Emit completed event (best effort - may not have WS connection)
      parsingEventsGateway.emitCompleted(jobId, result);
    } catch (error) {
      const err = error as Error;

      // 7. Update job: FAILED
      await updateParsingJob(
        { id: jobId },
        {
          status: "FAILED",
          error: {
            code: err.name,
            message: err.message,
          },
          failedAt: new Date(),
        },
        { id: true },
      );

      // 8. Emit error event (best effort)
      parsingEventsGateway.emitError(jobId, {
        code: err.name,
        message: err.message,
      });

      // Re-throw for pg-boss to handle (retry logic)
      throw error;
    }
  }
}

export const parsingOrchestrator = new ParsingOrchestrator();
