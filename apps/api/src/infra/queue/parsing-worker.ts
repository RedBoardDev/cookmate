import type { ParsingTypeValue } from "@cookmate/domain/shared";
import type { Job, PgBoss } from "pg-boss";
import type { ParsingJobPayload } from "./parsing-queue.service";

// Note: parsingOrchestrator will be imported after it's created
// For now, we define the worker setup function

export function startParsingWorker(
  boss: PgBoss,
  queueName: string,
  orchestrator: {
    process: (jobId: string, type: ParsingTypeValue, input: unknown) => Promise<void>;
  },
): void {
  void boss.work<ParsingJobPayload>(
    queueName,
    {
      batchSize: 1, // Process 1 job at a time per poll
      pollingIntervalSeconds: 10, // Poll every 10 seconds
    },
    async (jobs: Job<ParsingJobPayload>[]) => {
      // Process each job in the batch (should be 1 due to batchSize)
      for (const job of jobs) {
        const { jobId, type, input } = job.data;
        await orchestrator.process(jobId, type, input);
      }
    },
  );
}
