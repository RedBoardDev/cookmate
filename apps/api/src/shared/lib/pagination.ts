import { ApiError } from "@/interfaces/http/errors/api.error";

export type Pagination = {
  page: number;
  pageSize: number;
  findId?: string;
};

type PaginationParams = Partial<Pick<Pagination, "page" | "pageSize" | "findId">>;

export type PaginationQuery = {
  skip: number;
  take: number;
};

export const paginationForQuery = (pagination: Pagination): PaginationQuery => ({
  skip: (pagination.page - 1) * pagination.pageSize,
  take: pagination.pageSize,
});

export const buildPagination = (
  params: PaginationParams,
  defaultPageSize = 25,
): Pagination => ({
  page: params.page ?? 1,
  pageSize: params.pageSize ?? defaultPageSize,
  findId: params.findId,
});

/**
 * When findId is provided, calculates the page containing that item
 */
export const paginationForComplexQuery = async (
  pagination: Pagination | undefined,
  countAboveFn: () => Promise<number | undefined>
): Promise<PaginationQuery | undefined> => {
  if (!pagination) return undefined;

  if (!pagination.findId) {
    return paginationForQuery(pagination);
  }

  const position = await countAboveFn();
  if (position === undefined) {
    throw ApiError.resourceNotFound("Item not found for pagination");
  }

  const pageNumber = Math.floor(position / pagination.pageSize) + 1;
  return {
    skip: (pageNumber - 1) * pagination.pageSize,
    take: pagination.pageSize,
  };
};
