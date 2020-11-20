import {arraySlice} from './arraySlice';

export const paginate = (items, itemsPerPage) => {
  const paginatedItems = {
    data: [],
    pagination: {
      total_itens: items.length,
      total_pages: 0,
      first_page: 1,
      last_page: 1,
      current_page: 0,
    },
  };

  paginatedItems.data =
    items.length > itemsPerPage ? arraySlice(items, itemsPerPage) : [items];

  paginatedItems.pagination.total_pages = paginatedItems.data.length;

  paginatedItems.pagination.first_page = 1;

  paginatedItems.pagination.last_page = paginatedItems.data.length;

  paginatedItems.pagination.current_page = 1;

  return paginatedItems;
};
