import *as Types from '../../../actions/Table/TableAction';

import { takeEvery, put } from 'redux-saga/effects';

import { getTableAPI } from '../../api/Table/getTableApi';

function* get_Table() {
    
    let response = yield getTableAPI();
     
    if (response !== undefined) {
        yield put({ type: Types.GET_TABLE_SUCCESS, response: response });
    } else {
        yield put({ type: Types.GET_TABLE_ERROR, error });
    }
    
}

export function* watchGetTable() {
    yield takeEvery(Types.GET_TABLE, get_Table);
};