import {
  SEND_REMIND,
  SEND_REMIND_SUCCESS,
  SEND_REMIND_ERROR,
} from '../../actions/OrderItem/SendRemindAction';
const initialState = {
  loading: null,
  error: null,
  data: null,
};
const remindOrderReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case SEND_REMIND:
        return Object.assign({}, state, {
          loading: true,
          error: null,
          data: null,
        });
      case SEND_REMIND_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          error: null,
          data: action.response,
        });

      case SEND_REMIND_ERROR:
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

export default remindOrderReducers;
