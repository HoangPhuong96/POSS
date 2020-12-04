import * as Types from '../../../actions/SearchItem/SearchItemAction';

import {call, takeEvery, put} from 'redux-saga/effects';
import {getSearchItem} from '../../api/SearchItem/SearchItemApi';

function* postSearchItem(action) {
 
    // console.log("okkkk")
  let response = yield getSearchItem(action.data.info);
//   console.log(response);
  if (response !== undefined) {
    yield put({type: Types.SEARCH_ITEM_SUCCESS, response: response});
  } else {
    yield put({type: Types.SEARCH_ITEM_ERROR, response});
  }
}

export function* watchSearchItem() {
  yield takeEvery(Types.SEARCH_ITEM, postSearchItem);
}
