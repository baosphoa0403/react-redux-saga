import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { callAPIPost, fetchCount } from '../features/counter/counterAPI';
import { fetchCountSaga, getPost, saga } from '../features/counter/counterSlice';
import * as action from "../features/counter/counterSlice"
import { putAsync } from 'saga-toolkit';
const delay = (ms) => new Promise(res => setTimeout(res, ms))
// eslint-disable-next-line require-yield
// eslint-disable-next-line require-yield
function* helloSaga() {
    console.log('Hello Sagas!')
}

export function* incrementAsync() {
    yield delay(1000)
    yield put(saga(3))
}

export function* fetchPostAsync() {
    try {
        const response = yield call(callAPIPost);
        console.log(response);
        yield put(getPost(response.data))
    } catch (error) {

    }
}

// eslint-disable-next-line require-yield
export function* incrementAsyncSaga(action) {
    console.log(action);
    // const response = yield put(fetchCount(action))
    // yield put({ type: fetchCountSaga.fulfilled, payload: response })
    // console.log(response);
    // yield put
    // const response = yield fetchCount(action.payload);
    // console.log(response);
    // yield putAsync({ type: action.fetchCountSaga.fulfilled, payload: response });
    // return abc;

    // return response;
}

export function* watchIncrementAsync() {
    yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}
export function* watchFetchPost() {
    yield takeEvery("FETCH_POST", fetchPostAsync)
}
export function* watchIncrementAsyncSaga() {
    console.log(fetchCountSaga.type);
    yield takeLatest(fetchCountSaga.type, incrementAsyncSaga)
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchIncrementAsyncSaga()
    ])
}