import type { FastifyInstance } from "fastify";
import { parsingEventsGateway } from "@/infra/services/parser/parsing-events-gateway.service";
import { getParsingJobSelect } from "@/infra/db/repositories/parsing/get-parsing-job";
import type { ParsedRecipe } from "@cookmate/domain/recipe-parsing";

interface ParsingStreamParams {
  jobId: string;
}

export async function parsingStreamRoute(app: FastifyInstance): Promise<void> {
  app.get<{ Params: ParsingStreamParams }>(
    "/recipe-parsing/jobs/:jobId/stream",
    {
      websocket: true,
      // schema: { hide: false }, // Hide from Swagger
      preHandler: app.requireAuth,
    },
    async (socket, request) => {
      const { jobId } = request.params;
      const userId = request.user.id;

      try {
        // Fetch job to verify ownership
        const job = await getParsingJobSelect(
          { id: jobId },
          {
            id: true,
            userId: true,
            status: true,
            result: true,
            error: true,
          }
        );

        // Check ownership
        if (job.userId !== userId) {
          socket.close(4403, "Forbidden");
          return;
        }

        // Register WebSocket connection
        parsingEventsGateway.registerConnection(jobId, socket);

        // If already completed, send result immediately
        if (job.status === "COMPLETED" && job.result) {
          socket.send(
            JSON.stringify({
              type: "completed",
              result: job.result as ParsedRecipe,
            })
          );
          socket.close(1000, "Job already completed");
          return;
        }

        // If failed, send error immediately
        if (job.status === "FAILED" && job.error) {
          socket.send(
            JSON.stringify({
              type: "failed",
              error: job.error,
            })
          );
          socket.close(1000, "Job already failed");
          return;
        }

        // If cancelled, close immediately
        if (job.status === "CANCELLED") {
          socket.close(4410, "Job was cancelled");
          return;
        }

        // Otherwise, connection stays open and will receive events from the gateway
      } catch {
        socket.close(4404, "Job not found");
      }
    }
  );
}
