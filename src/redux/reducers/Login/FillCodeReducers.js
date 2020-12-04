import {
  POST_FILL_CODE_ERROR,
  POST_FILL_CODE_SUCCESS,
} from '../../actions/Login/FillCodeAction';
var initialState = [];
const fillCodeReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case POST_FILL_CODE_SUCCESS:
        return action.response;

      case POST_FILL_CODE_ERROR:
        return action.response;
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default fillCodeReducers;
