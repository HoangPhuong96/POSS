import * as Types from '../../actions/FindTransaction/FindTransactionAction';

var initalState = [];

const getFindTransactionReducers = (state = initalState, action) => {
  try {
    switch (action.type) {
      case Types.GET_FINDTRANSACTION_SUCCESS:
        return action.response;
      default:
        return state;
    }
  } catch (error) {
    return state;
  }
};

export default getFindTransactionReducers;
