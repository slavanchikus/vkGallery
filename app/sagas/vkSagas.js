import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getPhotos, getUser, getFreinds } from '../api/vkApi';

/* client id = 6285810 */

export function* fetchAccessToken() {
  try {
    window.location.replace(`https://oauth.vk.com/authorize?client_id=6285810&display=popup&redirect_uri=${window.location.href}&scope=friends&response_type=token&v=5.69`);
  } catch (error) {
    yield put({ type: 'TOKEN_REQUEST_ERROR' });
    throw error;
  }
}

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

export function* fetchFriends({ userId }) {
  try {
    const payload = yield call(getFreinds, userId);
    yield put({ type: 'FRIENDS_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'FRIENDS_REQUEST_ERROR' });
    throw error;
  }
}

export function* fetchPhotos({ userId, offset, count, album }) {
  try {
    const payload = yield call(getPhotos, userId, offset, count, album);
    yield put({ type: 'PHOTOS_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'PHOTOS_REQUEST_ERROR' });
    throw error;
  }
}

export function* watchVkRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('PHOTOS_REQUEST', fetchPhotos);
  yield takeEvery('FRIENDS_REQUEST', fetchFriends);
  yield takeEvery('TOKEN_REQUEST', fetchAccessToken);
}

export function* vkSagas() {
  yield fork(watchVkRequest);
}
