import {
  GET_ALLPROPERTY_SUCCESS,
  GET_ALLPROPERTY_ERROR,
} from '../../actions/Login/LoginAction';
var initialState = [];
const allPropertyReducers = (state = initialState, action) => {
  try {
    switch (action.type) {
      case GET_ALLPROPERTY_SUCCESS:
        // console.log(action.response);
        return action.response ;

      case GET_ALLPROPERTY_ERROR:
        return action.response ? action.response.isSuccess : -1;
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default allPropertyReducers;
