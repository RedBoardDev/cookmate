export type SortDirection = "asc" | "desc";

type SortField<TOrderBy> = Extract<keyof TOrderBy, string>;

export type SortConfig<TOrderBy> = {
  description?: string;
  default: TOrderBy[];
  fields: Partial<Record<SortField<TOrderBy>, (direction: SortDirection) => TOrderBy | TOrderBy[]>>;
};
