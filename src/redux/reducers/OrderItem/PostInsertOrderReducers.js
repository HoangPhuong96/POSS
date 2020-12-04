import {
  POST_INSERT_ORDER_ERROR,
  POST_INSERT_ORDER_SUCCESS,
  POST_INSERT_ORDER,
} from '../../actions/OrderItem/PostInsertOrderAction';
var initialState = {loading: null, data: null, error: null};
const postInsertOrderReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case POST_INSERT_ORDER:
        return Object.assign({}, state, {
          loading: null,
          error: null,
          data: null,
        });
      case POST_INSERT_ORDER_SUCCESS:
        // console.log(action.response);
        return Object.assign({}, state, {
          loading: false,
          error: null,
          data: action.response,
        });
      case POST_INSERT_ORDER_ERROR:
        return Object.assign({}, state, {
          loading: false,
          error: action.response,
          data: null,
        });
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default postInsertOrderReducers;
