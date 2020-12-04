import {
  POST_CHECK_DEVICE_SUCCESS,
  POST_CHECK_DEVICE_ERROR,
} from '../../actions/Login/CheckDeviceAction';
var initialState = '';
const checkDeviceReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case POST_CHECK_DEVICE_SUCCESS:
        // console.log(action.response);
        return action.response;

      case POST_CHECK_DEVICE_ERROR:
        return action.response;
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default checkDeviceReducers;
