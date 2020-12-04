
export const POST_REGISTER_DEVICE = 'POST_REGISTER_DEVICE';
export const POST_REGISTER_DEVICE_SUCCESS = 'POST_REGISTER_DEVICE_SUCCESS';
export const POST_REGISTER_DEVICE_ERROR = 'POST_REGISTER_DEVICE_ERROR';

export const postRegisterDeviceAction = (info) => {
  return {
    type: POST_REGISTER_DEVICE,
    data: info,
  };
};
