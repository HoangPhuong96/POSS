
export const POST_GET_FULL_MENU_ORDER = 'POST_GET_FULL_MENU_ORDER';
export const POST_GET_FULL_MENU_ORDER_SUCCESS = 'POST_GET_FULL_MENU_ORDER_SUCCESS';
export const POST_GET_FULL_MENU_ORDER_ERROR = 'POST_GET_FULL_MENU_ORDER_ERROR';

export const postGetFullMenuAction = (info) => {
    return {
        type: POST_GET_FULL_MENU_ORDER,
        data: info,
    };
};
