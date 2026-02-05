import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_SETTING, CREATE_SETTING_RED, DELETE_SETTING, DELETE_SETTING_RED, GET_SETTING, GET_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("settings", action.payload)
    let response = yield createRecord("settings", action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("settings")
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("settings", action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("settings", action.payload)
    //    yield put({ type: UPDATE_SETTING_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("settings", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}

export default function* SetiingSaga() {
    yield takeEvery(CREATE_SETTING, createSaga)                                   //watcher
    yield takeEvery(GET_SETTING, getSaga)                                         //watcher
    yield takeEvery(UPDATE_SETTING, updateSaga)                                   //watcher
    yield takeEvery(DELETE_SETTING, deleteSaga)                                   //watcher
}