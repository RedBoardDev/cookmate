import type { FastifyRequest, FastifyReply } from "fastify";
import { formatSuccess } from "@/interfaces/http/helpers/reply";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { pingDatabase } from "./db-access";

interface CheckResult {
  status: "up" | "down";
  latencyMs?: number;
}

async function checkDatabase(): Promise<CheckResult> {
  try {
    const latencyMs = await pingDatabase();
    return { status: "up", latencyMs };
  } catch {
    return { status: "down" };
  }
}

export async function healthCheckHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const database = await checkDatabase();

  const checks = { database };
  const isHealthy = Object.values(checks).every((c) => c.status === "up");

  return reply
    .status(isHealthy ? HttpStatus.OK : HttpStatus.ServiceUnavailable)
    .send(
      formatSuccess({
        status: isHealthy ? "healthy" : "unhealthy",
        uptime: process.uptime(),
        checks,
      })
    );
}
