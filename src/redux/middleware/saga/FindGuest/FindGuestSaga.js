import *as Types from '../../../actions/FindGuest/FindGuestAction';
import { takeEvery, put } from 'redux-saga/effects';
import { getFindGuest } from '../../api/FindGuest/FindGuestApi';

function* getFind_Guest() {
    let response = yield getFindGuest();
    // console.log(response)
    if (response !== undefined) {
        yield put({ type: Types.GET_FINDGUEST_SUCCESS, response: response });
    } else {
        yield put({ type: Types.GET_FINDGUEST_ERROR, error })
    }
}

export function* watchGetFindGuest() {
    yield takeEvery(Types.GET_FINDGUEST, getFind_Guest);
}