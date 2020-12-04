import * as Types from '../../../actions/OrderItem/PostGetFullMenuAction';

import { call, takeEvery, put } from 'redux-saga/effects';
import { post_Get_Full_Menu } from '../../api/OrderItem/PostGetFullMenuApi';

function* postGetFullMenu(action) {
  let response = yield post_Get_Full_Menu();

  if (response !== undefined) {
    yield put({ type: Types.POST_GET_FULL_MENU_ORDER_SUCCESS, response: response });
  } else {
    yield put({ type: Types.POST_GET_FULL_MENU_ORDER_ERROR, error });
  }
}

export function* watchGetFullMenu() {
  yield takeEvery(Types.POST_GET_FULL_MENU_ORDER, postGetFullMenu);
}
