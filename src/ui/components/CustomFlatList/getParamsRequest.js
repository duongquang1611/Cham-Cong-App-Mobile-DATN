export const getParamsRequest = (
  page,
  size,
  paramsFilter = {},
  // sort = 'id, desc',
) => {
  let params = {
    page: page,
    size: size,
    ...paramsFilter,
    // sort: sort,
  };
  return params;
};
