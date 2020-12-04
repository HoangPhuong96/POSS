import * as Types from '../../../actions/Location/LocationAction';
import {takeEvery, put} from 'redux-saga/effects';
import {getLocation} from '../../api/Location/LocationApi';
function* getDataLocation() {
  let response = yield getLocation();
  //   console.log('saga:', response);
  if (response !== undefined) {
    yield put({type: Types.GET_LOCATION_SUCCESS, response: response});
  } else {
    yield put({type: Types.GET_LOCATION_ERROR, error});
  }
}

export function* watchGetDataLocation() {
  yield takeEvery(Types.GET_LOCATION, getDataLocation);
}
