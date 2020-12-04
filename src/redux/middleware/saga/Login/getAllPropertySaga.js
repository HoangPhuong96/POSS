import {
  GET_ALLPROPERTY,
  GET_ALLPROPERTY_SUCCESS,
  GET_ALLPROPERTY_ERROR,
} from '../../../actions/Login/LoginAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {get_AllProperty} from '../../api/Login/getAllPropertyApi';

function* getAllProperty() {
  let response = yield get_AllProperty();
  // console.log(response);
// console.log('ok')
   
    if (response !== undefined) {
      // if (response.resultCode === 1) {
       
        yield put({type: GET_ALLPROPERTY_SUCCESS, response: response});
      // } else {
      //   yield put({type: GET_ALLPROPERTY_ERROR, error});
      // }
    } else {
      yield put({type: GET_ALLPROPERTY_ERROR, error});
    }
}

export function* watchAllProperty() {
  yield takeEvery(GET_ALLPROPERTY, getAllProperty);
}
