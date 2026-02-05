import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_FEATURE, GET_FEATURE_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("features", action.payload)
    let response = yield createRecord("features", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("features")
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("features", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("features", action.payload)
    //    yield put({ type: UPDATE_FEATURE_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("features", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)                                   //watcher
    yield takeEvery(GET_FEATURE, getSaga)                                         //watcher
    yield takeEvery(UPDATE_FEATURE, updateSaga)                                   //watcher
    yield takeEvery(DELETE_FEATURE, deleteSaga)                                   //watcher
}