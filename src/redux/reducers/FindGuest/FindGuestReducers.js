import *as Types from '../../actions/FindGuest/FindGuestAction';

var initalState = [];

const getFindGuestReducers = (state = initalState, action) => {
    try {
        switch (action.type) {
            case Types.GET_FINDGUEST_SUCCESS:
                return action.response;

            // case Types.GET_FINDGUEST_ERROR:
            //     return action.response ? action.response.isSuccess : -1;

            default:
                return state;
        }
    }
    catch (error) {
        return state;
    }
}

export default getFindGuestReducers;