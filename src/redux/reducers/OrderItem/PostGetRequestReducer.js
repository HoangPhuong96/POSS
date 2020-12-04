import {
  POST_GET_REQUEST_SUCCESS,
  POST_GET_REQUEST_ERROR,
} from '../../actions/OrderItem/PostGetRequestAction';
var initialState = [];
const requestReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case POST_GET_REQUEST_SUCCESS:
        // console.log(action.response);
        return action.response;

      case POST_GET_REQUEST_ERROR:
        return action.response;
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default requestReducers;
