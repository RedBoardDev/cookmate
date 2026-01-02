# Collection repository example

Structure (apps/api/src/infra/db/repositories/collection):
- types.ts: generic select/include + list/get types.
- collection-entity.ts: select object and mapper.
- get-collection.ts: get/select + get entity + findFirst.
- list-collections.ts: list select/entity with pagination; helper count above id.
- count-collections.ts: simple count helper.

Key snippets:
- Entity select + mapper:
  ```ts
  export const collectionEntitySelect = {
    id: true,
    name: true,
    emoji: true,
    description: true,
    visibility: true,
    shortUrl: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.CollectionSelect;

  export const toCollectionEntity = (data: CollectionEntityRecord): CollectionEntity =>
    CollectionEntity.create(
      {
        name: data.name,
        emoji: data.emoji,
        description: data.description,
        visibility: data.visibility,
        shortUrl: data.shortUrl,
        ownerId: data.userId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id
    );
  ```

- List with pagination + entity mapping:
  ```ts
  const listCollectionsSelectFn = async (where, select, orderBy, pagination) => {
    const paginationQuery = await paginationForComplexQuery(pagination, () =>
      countCollectionsAboveId(pagination?.findId, where)
    );

    return getPrisma().collection.findMany({
      where,
      select,
      orderBy: orderBy ?? { id: "desc" },
      ...paginationQuery,
    });
  };

  export const listCollectionsEntity = async (where, orderBy, pagination) => {
    const collections = await listCollectionsSelect(where, collectionEntitySelect, orderBy, pagination);
    return collections.map(toCollectionEntity);
  };
  ```

- Count above id helper:
  ```ts
  const countCollectionsAboveId = async (id, where?) => {
    if (!id) return undefined;
    return getPrisma().collection.count({ where: { ...where, id: { gt: id } } });
  };
  ```
