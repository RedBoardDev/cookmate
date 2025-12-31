import type { IncomingHttpHeaders } from "node:http";

/**
 * Converts Node.js/Fastify IncomingHttpHeaders to Web API Headers.
 * Required for Better Auth which expects Web API Headers format.
 */
export function toWebHeaders(incomingHeaders: IncomingHttpHeaders): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(incomingHeaders)) {
    if (value !== undefined) {
      headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }
  }

  return headers;
}
