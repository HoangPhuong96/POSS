import * as Types from '../../../actions/OrderItem/PostGetCondimentAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {post_Get_Condiment_ByItem} from '../../api/OrderItem/PostGetCondimentApi';

function* postGetCondiment(action) {
  let response = yield post_Get_Condiment_ByItem(action.data);
  if (response !== undefined) {
    yield put({type: Types.POST_GET_CONDIMENT_SUCCESS, response: response});
  } else {
    yield put({type: Types.POST_GET_CONDIMENT_ERROR, error});
  }
}

export function* watchGetCondiment() {
  yield takeEvery(Types.POST_GET_CONDIMENT, postGetCondiment);
}
