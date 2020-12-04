
export const POST_CHECK_DEVICE = 'POST_CHECK_DEVICE';
export const POST_CHECK_DEVICE_SUCCESS = 'POST_CHECK_DEVICE_SUCCESS';
export const POST_CHECK_DEVICE_ERROR = 'POST_CHECK_DEVICE_ERROR';

export const postCheckDeviceAction = (info) => {
  return {
    type: POST_CHECK_DEVICE,
    data: info,
  };
};
