import { handleError } from "@/shared/utils/handle-error";
import { pingDatabase } from "../../infra/db/ping-database";

type CheckStatus = "up" | "down";

interface HealthCheckItem {
  status: CheckStatus;
  latencyMs?: number;
}

export interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  uptime: number;
  checks: {
    database: HealthCheckItem;
  };
}

async function checkDatabase(): Promise<HealthCheckItem> {
  try {
    const latencyMs = await pingDatabase();
    return { status: "up", latencyMs };
  } catch {
    return { status: "down" };
  }
}

const executeHealthCheckFn = async (): Promise<HealthCheckResult> => {
  const database = await checkDatabase();
  const checks = { database };
  const isHealthy = Object.values(checks).every((check) => check.status === "up");

  return {
    status: isHealthy ? "healthy" : "unhealthy",
    uptime: process.uptime(),
    checks,
  };
};

export const executeHealthCheck = handleError(executeHealthCheckFn);
