import *as Types from '../../actions/SearchItem/SearchItemAction';
var initialState = [];
const searchItemReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case Types.SEARCH_ITEM:
                return Object.assign({}, state, {
                    loading: true,
                    error: null,
                    data: null,
                  });

            case Types.SEARCH_ITEM_SUCCESS:
                return Object.assign({}, state, {
                    loading: false,
                    error: null,
                    data: action.response,
                  });

            case Types.SEARCH_ITEM_ERROR:
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

export default searchItemReducers;
