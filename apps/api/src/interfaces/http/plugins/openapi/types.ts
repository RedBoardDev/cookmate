export type OpenAPIPaths = Record<string, Record<string, unknown>>;

export type OpenAPIComponents = {
  schemas?: Record<string, unknown>;
};

export type OpenAPITag = {
  name: string;
  description?: string;
};

export type OpenAPISchema = {
  paths?: OpenAPIPaths;
  components?: OpenAPIComponents;
  tags?: OpenAPITag[];
  [key: string]: unknown;
};
