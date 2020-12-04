import *as Types from '../../../actions/OrderItem/PostGetCategoryMenuAction';

import { call, takeEvery, put } from 'redux-saga/effects';
import { post_Get_Category_Menu } from '../../api/OrderItem/PostGetCategoryMenuApi';

function* postGetCategoryMenu(action) {
    let response = yield post_Get_Category_Menu(action.data);

    if (response !== undefined) {
        yield put({ type: Types.POST_GET_CATEGORY_MENU_ORDER_SUCCESS, response: response });
    } else {
        yield put({ type: Types.POST_GET_CATEGORY_MENU_ORDER_ERROR, error });
    }
}

export function* watchGetCategoryMenu() {
    yield takeEvery(Types.POST_GET_CATEGORY_MENU_ORDER, postGetCategoryMenu);
}
