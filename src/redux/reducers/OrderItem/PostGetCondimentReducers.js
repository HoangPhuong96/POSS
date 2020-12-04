import {
    POST_GET_CONDIMENT_SUCCESS,
    POST_GET_CONDIMENT_ERROR,
} from '../../actions/OrderItem/PostGetCondimentAction';
var initialState = [];
const condimentReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case POST_GET_CONDIMENT_SUCCESS:
                // console.log(action.response);
                return action.response;

            case POST_GET_CONDIMENT_ERROR:
                return action.response ? action.response.isSuccess : -1;
            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default condimentReducers;
