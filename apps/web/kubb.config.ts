import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { QueryKey } from "@kubb/plugin-react-query/components";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

export default defineConfig({
  root: ".",
  input: {
    path: "http://127.0.0.1:3001/docs/openapi",
  },
  output: {
    path: "./src/generated",
    clean: true,
    barrelType: "named",
    format: false,
    lint: false,
  },
  plugins: [
    pluginOas({ validate: true }),
    pluginTs({
      output: { path: "types" },
      enumType: "asConst",
      syntaxType: "type",
      group: { type: "tag", name: ({ group }) => `${group}Types` },
    }),
    pluginZod({
      output: { path: "schemas" },
      typed: true,
      inferred: true,
      group: { type: "tag", name: ({ group }) => `${group}Schemas` },
    }),
    pluginClient({
      output: { path: "clients" },
      importPath: "@/shared/core/network/httpClient",
      dataReturnType: "data",
      group: { type: "tag", name: ({ group }) => `${group}Client` },
    }),
    pluginReactQuery({
      output: { path: "hooks" },
      client: { importPath: "@/shared/core/network/httpClient", dataReturnType: "data" },
      query: { methods: ["get"] },
      mutation: { methods: ["post", "put", "patch", "delete"] },
      suspense: {},
      queryKey: (props) => {
        const keys = QueryKey.getTransformer(props);
        return ['"cookmate"', ...keys];
      },
      group: { type: "tag", name: ({ group }) => `${group}Hooks` },
    }),
  ],
});
