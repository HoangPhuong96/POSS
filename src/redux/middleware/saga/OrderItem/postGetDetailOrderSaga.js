import {
  POST_GET_DETAIL_ORDER,
  POST_GET_DETAIL_ORDER_SUCCESS,
  POST_GET_DETAIL_ORDER_ERROR,
} from '../../../actions/OrderItem/PostGetDetailOrderAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {post_Get_Detail_Order} from '../../api/OrderItem/postGetDetaiOrderApi';

function* postGetDetailOrder(action) {
  let response = yield post_Get_Detail_Order(action.data);

  if (response !== undefined) {
    yield put({type: POST_GET_DETAIL_ORDER_SUCCESS, response: response});
  } else {
    yield put({type: POST_GET_DETAIL_ORDER_ERROR, error});
  }
}

export function* watchGetDetailOrder() {
  yield takeEvery(POST_GET_DETAIL_ORDER, postGetDetailOrder);
}
