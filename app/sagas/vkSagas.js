import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getPhotos, getUser } from '../api/vkApi';

/* client id = 6008884 */

export function* fetchUser({ inputValue }) {
  try {
    const payload = yield call(getUser, inputValue);
    const userId = payload.response[0].id;
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
    yield put({ type: 'PHOTOS_REQUEST', userId });
  } catch (error) {
    window.location.replace('https://oauth.vk.com/authorize?client_id=6008884&display=page&redirect_uri=http://localhost:8080/&scope=friends&response_type=code&v=5.67');
    yield put({ type: 'USER_REQUEST_ERROR' });
    throw error;
  }
}

export function* fetchPhotos({ userId, offset }) {
  try {
    const payload = yield call(getPhotos, userId, offset);
    yield put({ type: 'PHOTOS_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'PHOTOS_REQUEST_ERROR' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('PHOTOS_REQUEST', fetchPhotos);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
