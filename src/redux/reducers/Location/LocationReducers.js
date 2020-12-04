import *as Types from '../../actions/Location/LocationAction';

var intialState = [];

const getLocationReducers = (state = intialState, action) => {
    try {
        switch (action.type) {
            case Types.GET_LOCATION_SUCCESS:
                return action.response;

            case Types.GET_LOCATION_ERROR:
                return action.response ? action.response.isSuccess : -1;

            default:
                return state;

        }
    }
    catch (error) {
        return state;
    }
}

export default getLocationReducers;