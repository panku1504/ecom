import { put, takeEvery } from "redux-saga/effects"

// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Services/Index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/Index"
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constants"

function* createSaga(action) {                                                          //worker
    // let response = yield createMultipartRecord("wishlist", action.payload)
    let response = yield createRecord("wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga() {                                                                   //worker
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                                          //worker
    yield updateRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })

    //    let response= yield updateMultipartRecord("wishlist", action.payload)
    //    yield put({ type: UPDATE_WISHLIST_RED, payload:response })
}

function* deleteSaga(action) {                                                          //worker
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* WishlistSaga() {
    yield takeEvery(CREATE_WISHLIST, createSaga)                                   //watcher
    yield takeEvery(GET_WISHLIST, getSaga)                                         //watcher
    yield takeEvery(UPDATE_WISHLIST, updateSaga)                                   //watcher
    yield takeEvery(DELETE_WISHLIST, deleteSaga)                                   //watcher
}