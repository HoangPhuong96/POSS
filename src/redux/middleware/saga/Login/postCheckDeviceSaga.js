import {
  POST_CHECK_DEVICE,
  POST_CHECK_DEVICE_SUCCESS,
  POST_CHECK_DEVICE_ERROR,
} from '../../../actions/Login/CheckDeviceAction';
import {call, takeEvery, put} from 'redux-saga/effects';
import {post_Check_Device} from '../../api/Login/postCheckDeviceApi';
import {post_Login_Passcode} from '../../api/Login/postLoginHavePasscodeApi';
import {userData, storeIsLogin} from '../../../../config/settings';

function* checkRegisterDevice(action) {
  let response = yield post_Check_Device(action.data[0]);

  if (response == true) {
    let result = yield post_Login_Passcode(action.data[1]);
    // console.log(result);
    if (result.TOKEN == null) {
      yield put({
        type: POST_CHECK_DEVICE_ERROR,
        response: {status: 0, mess: 'Passcode của bạn không tồn tại'},
      });
    } else {
      (userData.PROPERTY_CODE = action.data[1].PROPERTY_CODE),
        (userData.CASHIER_ID = result.CASHIER_ID),
        (userData.POS_CASHIER_WORK_ID = result.POS_CASHIER_WORK_ID),
        (userData.POS_WORKSTATION_ID = result.POS_WORKSTATION_ID),
        (userData.WORKSTATION_ID = result.WORKSTATION_ID),
        (userData.TITLE = result.TITLE),
        (userData.PASSCODE = result.PASSCODE),
        (userData.CASHIER_DATE = result.CASHIER_DATE),
        (userData.TOKEN = result.TOKEN),
        (userData.ORDER_TYPE_ID = result.ORDER_TYPE_ID),
        (userData.OUTLET_ID = action.data[1].OUTLET_ID),
        (userData.DEVICE_CODE = action.data[1].NAME_INTERNAL);
      yield put({type: POST_CHECK_DEVICE_SUCCESS, response: result});
    }
  } else {
    yield put({
      type: POST_CHECK_DEVICE_ERROR,
      response: {
        status: 0,
        mess: 'Thiết bị chưa được đăng ký vui lòng liên hệ bộ phận CSKH',
      },
    });
  }
}

export function* watchCheckDevice() {
  yield takeEvery(POST_CHECK_DEVICE, checkRegisterDevice);
}
