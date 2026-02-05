import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("faq", action.payload)
    let response = yield createRecord("faq", action.payload)
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("faq", action.payload)
    //    yield put({ type: UPDATE_FAQ_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}

export default function* FaqSaga() {
    yield takeEvery(CREATE_FAQ, createSaga)                                   //watcher
    yield takeEvery(GET_FAQ, getSaga)                                         //watcher
    yield takeEvery(UPDATE_FAQ, updateSaga)                                   //watcher
    yield takeEvery(DELETE_FAQ, deleteSaga)                                   //watcher
}