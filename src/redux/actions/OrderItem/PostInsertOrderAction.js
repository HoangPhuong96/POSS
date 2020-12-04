export const POST_INSERT_ORDER = 'POST_INSERT_ORDER';
export const POST_INSERT_ORDER_SUCCESS = 'POST_INSERT_ORDER_SUCCESS';
export const POST_INSERT_ORDER_ERROR = 'POST_INSERT_ORDER_ERROR';

export const postInsertOrderAction = (info) => {
  return {
    type: POST_INSERT_ORDER,
    data: info,
  };
};
