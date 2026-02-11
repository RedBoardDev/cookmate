import type { ParsingTypeValue } from "@cookmate/domain/shared";
import { PgBoss } from "pg-boss";

export interface ParsingJobPayload {
  jobId: string;
  type: ParsingTypeValue;
  input: unknown;
}

const QUEUE_NAME = "parse-recipe";

class ParsingQueueService {
  private boss: PgBoss | null = null;

  async initialize(databaseUrl: string): Promise<void> {
    this.boss = new PgBoss(databaseUrl);
    await this.boss.start();

    // Create queue if it doesn't exist (required in pg-boss v12+)
    await this.boss.createQueue(QUEUE_NAME, {
      retryLimit: 1,
      retryDelay: 30,
      retryBackoff: true,
    });
  }

  async addJob(jobId: string, data: { type: ParsingTypeValue; input: unknown }): Promise<void> {
    if (!this.boss) {
      throw new Error("Queue not initialized");
    }

    await this.boss.send(QUEUE_NAME, {
      jobId,
      ...data,
    } satisfies ParsingJobPayload);
  }

  getBoss(): PgBoss {
    if (!this.boss) {
      throw new Error("Queue not initialized");
    }
    return this.boss;
  }

  getQueueName(): string {
    return QUEUE_NAME;
  }

  async stop(): Promise<void> {
    if (this.boss) {
      await this.boss.stop();
      this.boss = null;
    }
  }
}

export const parsingQueueService = new ParsingQueueService();
