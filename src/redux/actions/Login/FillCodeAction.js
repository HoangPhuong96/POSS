
export const POST_FILL_CODE = 'POST_FILL_CODE';
export const POST_FILL_CODE_SUCCESS = 'POST_FILL_CODE_SUCCESS';
export const POST_FILL_CODE_ERROR = 'POST_FILL_CODE_ERROR';

export const postFillCodeAction = (info) => {
  return {
    type: POST_FILL_CODE,
    data: info,
  };
};
