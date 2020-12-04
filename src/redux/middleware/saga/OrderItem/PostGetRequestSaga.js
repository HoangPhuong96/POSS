import * as Types from '../../../actions/OrderItem/PostGetRequestAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {post_Get_Majo_Group_Id} from '../../api/OrderItem/loadDataByMajorIdApi';

function* postGetRequest(action) {
  let response = yield post_Get_Majo_Group_Id(action.data);

  if (response !== undefined) {
    yield put({
      type: Types.POST_GET_REQUEST_SUCCESS,
      response: response,
    });
  } else {
    yield put({type: Types.POST_GET_REQUEST_ERROR, error});
  }
}

export function* watchGetRequest() {
  yield takeEvery(Types.POST_GET_REQUEST, postGetRequest);
}
