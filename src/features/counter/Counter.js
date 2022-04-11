import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  incrementByAmount,
  selectMessage,
  incrementIfOdd,
  selectCount,
  selectStatus,
  selectListPost,
  fetchCountSaga,
} from './counterSlice';
import styles from './Counter.module.css';
// import * as action from "../counter/"
export function Counter() {
  const status = useSelector(selectStatus);
  const count = useSelector(selectCount);
  const message = useSelector(selectMessage);
  const listPost = useSelector(selectListPost);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
    dispatch({ type: "FETCH_POST" })
  }, [dispatch])

  return (
    <div>
      {status === "idle" ? <>
        {message !== "" ? <h1>Some thing when wrong {message}</h1> : <><div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => dispatch({ type: 'counter/increment', payload: 3 })}
          >
            +
          </button>
        </div>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button
              className={styles.button}
              onClick={() => dispatch(incrementByAmount(incrementValue))}
            >
              Add Amount
            </button>
            <button
              className={styles.asyncButton}
              // onClick={() => dispatch(incrementAsync(incrementValue))}
              // onClick={() => { dispatch(fetchCountSaga(incrementAmount)) }}
              onClick={() => { dispatch({ type: fetchCountSaga.type, payload: incrementAmount }) }}
            >
              Add Async
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(incrementIfOdd(incrementValue))}
            >
              Add If Odd
            </button>

            <button
              className={styles.button}
              onClick={() => dispatch({ type: 'INCREMENT_ASYNC' })}
            >
              Test Saga
            </button>

          </div>
          <div className={styles.row}>
            <ul>
              {listPost.map((item, i) => {
                return <li key={i}>{item.title}</li>
              })}
            </ul>
          </div></>}</> : <>
        <h1>Loading</h1>
      </>}
    </div>
  );
}
