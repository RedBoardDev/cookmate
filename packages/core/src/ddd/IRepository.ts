export type FindUniqueParams<TWhere, TSelect = unknown> = {
  where?: TWhere;
  select?: TSelect;
};

export type FindManyParams<TWhere, TSelect = unknown, TOrderBy = unknown> = {
  where?: TWhere;
  select?: TSelect;
  orderBy?: TOrderBy;
  take?: number;
  page?: number;
  includeDeleted?: boolean;
};

export type UpdateParams<TWhere, TUpdate> = {
  where?: TWhere;
  data: TUpdate;
};

export type UpdateManyParams<TWhere, TUpdate> = {
  where?: TWhere;
  data: TUpdate;
};

export type DeleteParams<TWhere> = {
  where?: TWhere;
};

export type DeleteManyParams<TWhere> = {
  where?: TWhere;
};

export type CreateManyParams<TCreate> = {
  data: TCreate[];
};

export type CreateParams<TCreate> = {
  data: TCreate;
};
