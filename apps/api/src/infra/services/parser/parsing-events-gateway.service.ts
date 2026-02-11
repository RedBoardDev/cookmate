import type { ParsedRecipe, ParsingProgress } from "@cookmate/domain/recipe-parsing";
import type { WebSocket } from "@fastify/websocket";

interface WebSocketMessage {
  type: "progress" | "completed" | "failed";
  step?: string;
  percent?: number;
  result?: ParsedRecipe;
  error?: { code: string; message: string };
}

class ParsingEventsGateway {
  private connections = new Map<string, WebSocket>();

  registerConnection(jobId: string, ws: WebSocket): void {
    // Close any existing connection for this job
    const existing = this.connections.get(jobId);
    if (existing && existing.readyState === existing.OPEN) {
      existing.close(1000, "Replaced by new connection");
    }

    this.connections.set(jobId, ws);

    ws.on("close", () => {
      this.connections.delete(jobId);
    });

    ws.on("error", () => {
      this.connections.delete(jobId);
    });
  }

  emitProgress(jobId: string, data: ParsingProgress): void {
    this.send(jobId, {
      type: "progress",
      step: data.step,
      percent: data.percent,
    });
  }

  emitCompleted(jobId: string, result: ParsedRecipe): void {
    this.send(jobId, {
      type: "completed",
      result,
    });
    this.closeConnection(jobId);
  }

  emitError(jobId: string, error: { code: string; message: string }): void {
    this.send(jobId, {
      type: "failed",
      error,
    });
    this.closeConnection(jobId);
  }

  private send(jobId: string, message: WebSocketMessage): void {
    const ws = this.connections.get(jobId);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private closeConnection(jobId: string): void {
    const ws = this.connections.get(jobId);
    if (ws) {
      ws.close(1000, "Job finished");
      this.connections.delete(jobId);
    }
  }

  hasConnection(jobId: string): boolean {
    const ws = this.connections.get(jobId);
    return ws !== undefined && ws.readyState === ws.OPEN;
  }
}

export const parsingEventsGateway = new ParsingEventsGateway();
