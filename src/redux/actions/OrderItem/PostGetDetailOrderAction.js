
export const POST_GET_DETAIL_ORDER = 'POST_GET_DETAIL_ORDER';
export const POST_GET_DETAIL_ORDER_SUCCESS = 'POST_GET_DETAIL_ORDER_SUCCESS';
export const POST_GET_DETAIL_ORDER_ERROR = 'POST_GET_DETAIL_ORDER_ERROR';

export const postGetDetailOrderAction = (info) => {
  return {
    type: POST_GET_DETAIL_ORDER,
    data: info,
  };
};
