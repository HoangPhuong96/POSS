export const GET_FINDGUEST = 'GET_FINDGUEST';
export const GET_FINDGUEST_SUCCESS = 'GET_FINDGUEST_SUCCESS';
export const GET_FINDGUEST_ERROR = 'GET_FINDGUEST_ERROR';

export const getFindGuestAction = (PROPERTY_CODE, SEARCH_TYPE5, SEARCH_TYPE9) => {
    return {
        type: GET_FINDGUEST,
        data: { PROPERTY_CODE, SEARCH_TYPE5, SEARCH_TYPE9 },
    };
};