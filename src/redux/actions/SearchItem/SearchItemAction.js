export const SEARCH_ITEM = 'SEARCH_ITEM';
export const SEARCH_ITEM_SUCCESS = 'SEARCH_ITEM_SUCCESS';
export const SEARCH_ITEM_ERROR = 'SEARCH_ITEM_ERROR';

export const postSearchItemAction = (info)  =>{
    return {
        type: SEARCH_ITEM,
        data: {info},
    }
}