import { env } from "@/shared/lib/env";

export type HttpMethod =
  | "GET"
  | "PUT"
  | "PATCH"
  | "POST"
  | "DELETE"
  | "get"
  | "put"
  | "patch"
  | "post"
  | "delete";

export type RequestConfig<TData = unknown> = {
  url?: string;
  method: HttpMethod;
  params?: Record<string, unknown>;
  data?: TData | FormData;
  responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export type ResponseErrorConfig<TError = unknown> = {
  error: TError;
  status: number;
  statusText: string;
};

const BASE_URL = env.apiBaseUrl;

const buildUrl = (url: string | undefined, params?: Record<string, unknown>) => {
  const urlObj = new URL(url ?? "", BASE_URL);
  if (!params) {
    return urlObj;
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          urlObj.searchParams.append(key, String(item));
        }
      }
    } else {
      urlObj.searchParams.set(key, String(value));
    }
  }

  return urlObj;
};

const parseResponse = async (
  response: Response,
  responseType?: RequestConfig["responseType"]
) => {
  if (response.status === 204 || responseType === "stream") {
    return null;
  }

  if (responseType === "arraybuffer") {
    return response.arrayBuffer();
  }

  if (responseType === "blob") {
    return response.blob();
  }

  if (responseType === "text" || responseType === "document") {
    return response.text();
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export async function client<TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> {
  const { url, method, params, data, signal, headers = {}, responseType } = config;
  const urlObj = buildUrl(url, params);

  const requestHeaders = new Headers(headers);
  if (data && !(data instanceof FormData) && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(urlObj.toString(), {
    method: method.toUpperCase(),
    body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
    signal,
    headers: requestHeaders,
    credentials: "include"
  });

  const responseData = await parseResponse(response, responseType);

  if (!response.ok) {
    throw {
      error: responseData as TError,
      status: response.status,
      statusText: response.statusText
    } as ResponseErrorConfig<TError>;
  }

  return {
    data: responseData as TData,
    status: response.status,
    statusText: response.statusText
  };
}

export default client;
