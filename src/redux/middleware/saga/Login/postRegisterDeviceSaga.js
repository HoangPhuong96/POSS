import {
  POST_REGISTER_DEVICE,
  POST_REGISTER_DEVICE_SUCCESS,
  POST_REGISTER_DEVICE_ERROR,
} from '../../../actions/Login/RegisterDeviceAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {post_Register_Device} from '../../api/Login/postRegisterDeviceApi';

function* postRegisterDevice(action) {
  let response = yield post_Register_Device(action.data);
  console.log(response);
  if (response == true) {
    yield put({type: POST_REGISTER_DEVICE_SUCCESS, response: response});
  } else {
    yield put({type: POST_REGISTER_DEVICE_ERROR, error});
  }
}

export function* watchRegisterDevice() {
  yield takeEvery(POST_REGISTER_DEVICE, postRegisterDevice);
}
