import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("testimonial", action.payload)
    let response = yield createRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("testimonial", action.payload)
    //    yield put({ type: UPDATE_TESTIMONIAL_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* TestimonialSaga() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)                                   //watcher
    yield takeEvery(GET_TESTIMONIAL, getSaga)                                         //watcher
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)                                   //watcher
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)                                   //watcher
}