
export const POST_GET_CONDIMENT = 'POST_GET_CONDIMENT';
export const POST_GET_CONDIMENT_SUCCESS = 'POST_GET_CONDIMENT_SUCCESS';
export const POST_GET_CONDIMENT_ERROR = 'POST_GET_CONDIMENT_ERROR';

export const postGetCondimentuAction = (info) => {
  return {
    type: POST_GET_CONDIMENT,
    data: info,
  };
};
