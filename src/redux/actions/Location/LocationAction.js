export const GET_LOCATION = 'GET_LOCATION';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';

export const getAllLocation = (PROPERTY_CODE, OUTLET_ID) => {
    return {
        type: GET_LOCATION,
        data: { PROPERTY_CODE, OUTLET_ID },
    };
};