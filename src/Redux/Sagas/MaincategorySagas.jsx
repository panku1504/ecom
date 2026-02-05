import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("maincategory", action.payload)
    let response = yield createRecord("maincategory", action.payload)
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("maincategory")
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("maincategory", action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("maincategory", action.payload)
    //    yield put({ type: UPDATE_MAINCATEGORY_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* MaincategorySaga() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)                                   //watcher
    yield takeEvery(GET_MAINCATEGORY, getSaga)                                         //watcher
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)                                   //watcher
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)                                   //watcher
}