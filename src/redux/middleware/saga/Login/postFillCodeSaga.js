import {
  POST_FILL_CODE,
  POST_FILL_CODE_ERROR,
  POST_FILL_CODE_SUCCESS,
} from '../../../actions/Login/FillCodeAction';
import {deviceInfo} from '../../../../config/settings';
import {call, takeEvery, put} from 'redux-saga/effects';
import {postFillCodeApi} from '../../api/Login/postFillCodeApi';

function* postFillCode(action) {
  try {
    let response = yield postFillCodeApi(action.data);

    // console.log(response);

    if (response != undefined) {
      yield put({type: POST_FILL_CODE_SUCCESS, response: response});
      deviceInfo.CUSTOMER_CODE = action.data.CUSTOMER_CODE;
      deviceInfo.DEVICE_NAME = action.data.DEVICE_NAME;
      deviceInfo.MAC_ADRESS = action.data.MAC_ADRESS;
    } else {
      yield put({type: POST_FILL_CODE_ERROR, response});
    }
  } catch (error) {
    yield put({
      type: POST_FILL_CODE_ERROR,
      NoInternet: 'Không có kết nối internet',
    });
  }
}

export function* watchFillCode() {
  yield takeEvery(POST_FILL_CODE, postFillCode);
}
