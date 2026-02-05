import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("brand", action.payload)
    let response = yield createRecord("brand", action.payload)
    yield put({ type: CREATE_BRAND_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("brand")
    yield put({ type: GET_BRAND_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("brand", action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("brand", action.payload)
    //    yield put({ type: UPDATE_BRAND_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("brand", action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* BrandSaga() {
    yield takeEvery(CREATE_BRAND, createSaga)                                   //watcher
    yield takeEvery(GET_BRAND, getSaga)                                         //watcher
    yield takeEvery(UPDATE_BRAND, updateSaga)                                   //watcher
    yield takeEvery(DELETE_BRAND, deleteSaga)                                   //watcher
}