import { route } from "@/shared/lib/route";
import { createJobFromUrlHandler } from "./handler";
import { schemas } from "./schema";

export const createJobFromUrlRoute = route()
  .post("/from-url")
  .auth()
  .meta({
    tags: ["Recipe Parsing"],
    summary: "Create parsing job from URL",
    description: "Start parsing a recipe from a URL. Returns a job ID to track progress via WebSocket or polling.",
  })
  .schemas(schemas)
  .handle(createJobFromUrlHandler);
