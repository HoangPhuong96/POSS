export const GET_TABLE = 'GET_TABLE';
export const GET_TABLE_SUCCESS = 'GET_TABLE_SUCCESS';
export const GET_TABLE_ERROR = 'GET_TABLE_ERROR';



export const getAllTableMapAction = (PROPERTY_CODE, OUTLET_ID) => {
    return {
        type: GET_TABLE,
        data: { PROPERTY_CODE, OUTLET_ID },
    };
};