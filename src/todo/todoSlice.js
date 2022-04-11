import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { incrementAsync } from '../features/counter/counterSlice';

export const addTodoAsync = createAction('todo/addTodoAsync');

function* addTodoSaga(action) {
    const data = yield call(incrementAsync, action.payload);
    yield put({ type: "counter/fetchCount", payload: data });
}

export function* todoSaga() {
    yield takeLatest(addTodoAsync, addTodoSaga);
}

// rest of the code
