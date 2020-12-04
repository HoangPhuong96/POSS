import *as Types from '../../actions/Location_Table/LocationTableAction';

var initialState = '';
const getLocationTableReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case Types.GET_LOCATION_TABLE_SUCCESS:
                return action.response;

            case Types.GET_LOCATION_TABLE_ERROR:
                return false
            default:
                return state;
        }
    } catch (error) {
        return state;
    }
};

export default getLocationTableReducers;
