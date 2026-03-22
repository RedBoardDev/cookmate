import { route } from "@/shared/lib/route";
import { healthCheckHandler } from "./handler";
import { schemas } from "./schema";

export const healthCheckRoute = route()
  .get("/check")
  .meta({
    tags: ["Health"],
    summary: "Health check",
    description: "Check API and database health.",
  })
  .schemas(schemas)
  .handle(healthCheckHandler);
