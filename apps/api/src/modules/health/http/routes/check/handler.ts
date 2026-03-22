import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeHealthCheck } from "../../../queries/check/execute";
import type { schemas } from "./schema";

export const healthCheckHandler: RouteHandler<typeof schemas> = async () => {
  const result = await executeHealthCheck();
  const status = result.status === "healthy" ? HttpStatus.OK : HttpStatus.ServiceUnavailable;

  return {
    status,
    data: result,
  };
};
