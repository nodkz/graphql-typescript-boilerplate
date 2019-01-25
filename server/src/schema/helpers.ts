export function preparePageInfo(page: number, perPage: number, totalItems: number) {
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    totalPages,
    totalItems,
    page,
    perPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
