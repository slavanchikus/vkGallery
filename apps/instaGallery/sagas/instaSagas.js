import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUser } from '../api/instaApi';

/* client id = 6285810 */

export function* fetchUser({ inputValue }) {
  try {
    const userPayload = yield call(getUser, inputValue);
    const payload = { ...userPayload, inputValue };
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
    throw error;
  }
}

export function* watchInstaRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
}

export function* instaSagas() {
  yield fork(watchInstaRequest);
}
