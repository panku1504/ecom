import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_CART, CREATE_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("cart", action.payload)
    let response = yield createRecord("cart", action.payload)
    yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("cart")
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("cart", action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("cart", action.payload)
    //    yield put({ type: UPDATE_CART_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* CartSaga() {
    yield takeEvery(CREATE_CART, createSaga)                                   //watcher
    yield takeEvery(GET_CART, getSaga)                                         //watcher
    yield takeEvery(UPDATE_CART, updateSaga)                                   //watcher
    yield takeEvery(DELETE_CART, deleteSaga)                                   //watcher
}