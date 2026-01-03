import type { WhereConfig, WhereConfigs } from "../../types";

export const defineWhereConfigs = <TWhere, TContext = unknown>(
  configs: Array<WhereConfig<TWhere, TContext> | WhereConfig<TWhere, TContext>[]>
): WhereConfigs<TWhere, TContext> => {
  const flattened: WhereConfig<TWhere, TContext>[] = [];

  for (const config of configs) {
    if (Array.isArray(config)) {
      flattened.push(...config);
      continue;
    }

    flattened.push(config);
  }

  return flattened;
};
