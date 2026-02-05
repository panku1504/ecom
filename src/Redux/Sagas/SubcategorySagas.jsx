import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("subcategory", action.payload)
    let response = yield createRecord("subcategory", action.payload)
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("subcategory")
    yield put({ type: GET_SUBCATEGORY_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("subcategory", action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("subcategory", action.payload)
    //    yield put({ type: UPDATE_SUBCATEGORY_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("subcategory", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* SubcategorySaga() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)                                   //watcher
    yield takeEvery(GET_SUBCATEGORY, getSaga)                                         //watcher
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)                                   //watcher
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)                                   //watcher
}