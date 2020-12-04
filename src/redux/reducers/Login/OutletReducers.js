import {
    GET_OUTLET_SUCCESS,
    GET_OUTLET_ERROR,
  } from '../../actions/Login/LoginAction';
  var initialState = [];
  const outletReducers = (state = initialState, action) => {
    try {
      switch (action.type) {
        case GET_OUTLET_SUCCESS:
          // console.log(action.response);
          return action.response ;
   
        case GET_OUTLET_ERROR:
          return action.response ? action.response.isSuccess : -1;
        default:
          return state;
      }
    } catch (error) {
      return state;
    }
  };
  
  export default outletReducers;
  