import { updateParsingJob } from "@/infra/db/repositories/parsing/update-parsing-job";
import { parsingEventsGateway } from "@/infra/services/parser/parsing-events-gateway.service";
import type { ParsingProgress } from "@cookmate/domain/recipe-parsing";

class ParsingProgressReporter {
  async report(jobId: string, progress: ParsingProgress): Promise<void> {
    try {
      await updateParsingJob({ id: jobId }, { progress }, { id: true });
    } catch {
      // Best effort: progress persistence shouldn't block parsing
    }

    parsingEventsGateway.emitProgress(jobId, progress);
  }
}

export const parsingProgressReporter = new ParsingProgressReporter();
