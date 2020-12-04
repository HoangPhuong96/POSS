import *as Types from '../../../actions/Location_Table/LocationTableAction'
import { takeEvery, put } from 'redux-saga/effects';
import { getLocation } from '../../api/Location_Table/LocationApi'
import { getTable } from '../../api/Location_Table/TableApi'
function* getLocation_Table() {
    let isLocation = false;
    let isTable = false;
    let arrResult = [];
    let responseLocation = yield getLocation();
    responseLocation !== undefined ? isLocation = true : isLocation = false
    arrResult.push(responseLocation)
    let responseTable = yield getTable();
    responseTable !== undefined ? isTable = true : isTable = false
    arrResult.push(responseTable)

    if (isLocation === true && isTable === true) {

        yield put({ type: Types.GET_LOCATION_TABLE_SUCCESS, response: arrResult });
    } else {
        yield put({ type: Types.GET_LOCATION_TABLE_ERROR, error });
    }
}


export function* watchGetLocationTable() {
    yield takeEvery(Types.GET_LOCATION_TABLE, getLocation_Table);
}