import { Request } from "express";
import { SortOrder } from "mongoose";

interface QueryParams {
  name?: string;
  email?: string;
  age?: number;
}

interface SortOptions {
  [key: string]: SortOrder;
}

interface QueryOptions {
  page: number;
  perPage: number;
  filter: QueryParams;
  sort?: SortOptions;
}

export const buildQueryOptions = (req: Request): QueryOptions => {
  const { page = 1, perPage = 10, filter = "{}", sort = "{}" } = req.query;
  const parseFilter: { [key: string]: unknown } = JSON.parse(filter as string);

  const query: { [key: string]: unknown } = {};
  if (parseFilter.name) {
    query.name = { $regex: parseFilter.name, $options: "i" };
  }
  if (parseFilter.email) {
    query.email = { $regex: parseFilter.email, $options: "i" };
  }
  if (parseFilter.age) {
    query.age = parseFilter.age;
  }

  const pageNumber = parseInt(page as string, 10);
  const perPageNumber = parseInt(perPage as string, 10);

  let sortOptions: SortOptions | undefined = undefined;
  if (sort) sortOptions = JSON.parse(sort as string);

  return {
    page: pageNumber,
    perPage: perPageNumber,
    filter: query,
    sort: sortOptions,
  };
};
