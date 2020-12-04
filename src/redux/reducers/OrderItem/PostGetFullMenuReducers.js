import {
    POST_GET_FULL_MENU_ORDER_SUCCESS,
    POST_GET_FULL_MENU_ORDER_ERROR,
} from '../../actions/OrderItem/PostGetFullMenuAction';
var initialState = [];
const fullMenuReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case POST_GET_FULL_MENU_ORDER_SUCCESS:
                // console.log(action.response);
                return action.response;

            case POST_GET_FULL_MENU_ORDER_ERROR:
                return action.response;
            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default fullMenuReducers;
