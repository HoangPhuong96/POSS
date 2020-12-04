export const GET_MENU_ITEM = 'GET_MENU_ITEM';
export const GET_MENU_ITEM_SUCCESS = 'GET_MENU_ITEM_SUCCESS';
export const GET_MENU_ITEM_ERROR = 'GET_MENU_ITEM_ERROR';

export const getFindTransaction = (info) => {
    return {
        type: GET_MENU_ITEM,
        data: { info },
    }
}