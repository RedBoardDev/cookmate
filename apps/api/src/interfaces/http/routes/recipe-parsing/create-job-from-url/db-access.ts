import { v4 as uuid } from "uuid";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

type CreateParsingJobInput = {
  url: string;
  userId: string;
};

const createParsingJobFn = async (input: CreateParsingJobInput) => {
  const jobId = uuid();

  const job = await getPrisma().parsingJob.create({
    data: {
      id: jobId,
      type: "URL",
      status: "QUEUED",
      input: { url: input.url },
      user: { connect: { id: input.userId } },
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
    },
  });

  return {
    id: job.id,
    status: job.status as "QUEUED",
    createdAt: job.createdAt,
  };
};

export const createParsingJob = handleError(createParsingJobFn);
