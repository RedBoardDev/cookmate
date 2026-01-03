import { buildPagination, type Pagination } from "@/shared/lib/pagination";

type PaginationQuery = Partial<Pick<Pagination, "page" | "pageSize" | "findId">>;

export const parsePagination = (query: PaginationQuery | undefined): Pagination =>
  buildPagination({
    page: query?.page,
    pageSize: query?.pageSize,
    findId: query?.findId,
  });
