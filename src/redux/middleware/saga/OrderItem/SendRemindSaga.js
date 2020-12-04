import * as Types from '../../../actions/OrderItem/SendRemindAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {send_Remind_Api} from '../../api/OrderItem/SendRemindApi';

function* sendRemindFlow(action) {
  // console.log('Saga Remind', action.data);

  let response = yield send_Remind_Api(action.data);
  // console.log(response);
  if (response !== undefined) {
    yield put({type: Types.SEND_REMIND_SUCCESS, response: response});
  } else {
    yield put({type: Types.SEND_REMIND_ERROR, response});
  }
}

export function* watchSendRemind() {
  yield takeEvery(Types.SEND_REMIND, sendRemindFlow);
}
