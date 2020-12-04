import *as Types from '../../../actions/FindTransaction/FindTransactionAction';

import { takeEvery, put } from 'redux-saga/effects';

import { getFindTransaction } from '../../api/FindTransaction/FindTransactionApi';

function* getFind_Transaction() {
    let response = yield getFindTransaction();
    if (response !== undefined) {
        yield put({ type: Types.GET_FINDTRANSACTION_SUCCESS, response: response })

    } else {
        yield put({ type: Types.GET_FINDTRANSACTION_ERROR, error })
    }
}

export function* watchGetFindTransaction() {
    yield takeEvery(Types.GET_FINDTRANSACTION, getFind_Transaction);
}