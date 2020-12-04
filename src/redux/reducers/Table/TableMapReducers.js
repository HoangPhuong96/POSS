import {
    GET_TABLE_SUCCESS,
    GET_TABLE_ERROR,
} from '../../actions/Table/TableAction';
var initialState = [];
const tableMapReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case GET_TABLE_SUCCESS:
                // console.log(action.response);
                return action.response;

            case GET_TABLE_ERROR:
                return action.response ? action.response.isSuccess : -1;
            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default tableMapReducers;
