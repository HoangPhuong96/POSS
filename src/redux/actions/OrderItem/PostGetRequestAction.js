
export const POST_GET_REQUEST = 'POST_GET_REQUEST';
export const POST_GET_REQUEST_SUCCESS = 'POST_GET_REQUEST_SUCCESS';
export const POST_GET_REQUEST_ERROR = 'POST_GET_REQUEST_ERROR';

export const postGetRequestAction = (info) => {
  return {
    type: POST_GET_REQUEST,
    data: info,
  };
};
