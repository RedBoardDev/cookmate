import { parsingQueueService } from "@/infra/queue/parsing-queue.service";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { createParsingJob } from "./db-access";
import type { schemas } from "./schema";

export const createJobFromUrlHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { url } = ctx.body;
  const { id: userId } = ctx.user;

  const job = await createParsingJob({
    url,
    userId,
  });

  await parsingQueueService.addJob(job.id, {
    type: "URL",
    input: { url },
  });

  return {
    status: HttpStatus.Created,
    data: {
      jobId: job.id,
      status: job.status,
      createdAt: job.createdAt.toISOString(),
    },
  };
};
