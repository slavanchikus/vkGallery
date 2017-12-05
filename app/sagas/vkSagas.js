import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getPhotos, getUser } from '../api/vkApi';

/* client id = 6008884 */

export function* fetchAccessToken() {
  try {
    window.location.replace('https://oauth.vk.com/authorize?client_id=6008884&display=popup&redirect_uri=http://localhost:8080&scope=friends&response_type=token&v=5.67');
  } catch (error) {
    yield put({ type: 'TOKEN_REQUEST_ERROR' });
    throw error;
  }
}

export function* fetchUser({ inputValue }) {
  try {
    let payload = yield call(getUser, inputValue);
    payload = { ...payload, inputValue };
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
    throw error;
  }
}

export function* fetchPhotos({ userId, offset, count }) {
  try {
    const payload = yield call(getPhotos, userId, offset, count);
    yield put({ type: 'PHOTOS_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'PHOTOS_REQUEST_ERROR' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('PHOTOS_REQUEST', fetchPhotos);
  yield takeEvery('TOKEN_REQUEST', fetchAccessToken);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
