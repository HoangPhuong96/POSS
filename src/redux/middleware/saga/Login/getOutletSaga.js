import {
  GET_OUTLET,
  GET_OUTLET_SUCCESS,
  GET_OUTLET_ERROR,
} from '../../../actions/Login/LoginAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {get_Outlet} from '../../api/Login/getOutletApi';

function* getOutlet() {
  let response = yield get_Outlet();
  if (response !== undefined) {
    yield put({type: GET_OUTLET_SUCCESS, response: response});
  } else {
    yield put({type: GET_OUTLET_ERROR, error});
  }
}

export function* watchGetOutlet() {
  yield takeEvery(GET_OUTLET, getOutlet);
}
