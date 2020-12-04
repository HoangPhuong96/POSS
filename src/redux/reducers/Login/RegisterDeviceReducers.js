import {
  POST_REGISTER_DEVICE_SUCCESS,
  POST_REGISTER_DEVICE_ERROR,
} from '../../actions/Login/RegisterDeviceAction';
var initialState = false;
const registerDeviceReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case POST_REGISTER_DEVICE_SUCCESS:
        // console.log(action.response);
        return {status: action.response};

      case POST_REGISTER_DEVICE_ERROR:
        return {status: action.response};
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default registerDeviceReducers;
