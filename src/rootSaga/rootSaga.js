import axios from 'axios';
import { all, call, put, take, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { callAPIPost } from '../features/counter/counterAPI';
import { fetchCountSaga, getPostFail, getPostPending, getPostSuccess, saga } from '../features/counter/counterSlice';
const delay = (ms) => new Promise(res => setTimeout(res, ms))
// eslint-disable-next-line require-yield
// eslint-disable-next-line require-yield
function* helloSaga() {
    console.log('Hello Sagas!')
}
function* log(action) {
    console.log(action);
}

export function* incrementAsync() {
    yield delay(1000)
    yield put(saga(3))
}

export function* fetchPostAsync() {
    yield put(getPostPending())
    // yield delay(5000)
    try {
        const response = yield call(axios, "https://jsonplaceholder.typicode.com/posts");
        console.log(response);
        yield put(getPostSuccess(response.data))
    } catch (error) {
        yield put(getPostFail({ ...error }.response.status))
    }
}

export function* watchFetchPost() {
    // yield takeEvery("FETCH_POST", fetchPostAsync)
    yield throttle(200, 'FETCH_POST', fetchPostAsync)
}


export default function* rootSaga() {
    // yield take("*", log)
    yield all([
        helloSaga(),
        watchFetchPost(),
    ])

}