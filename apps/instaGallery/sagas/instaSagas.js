import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUser, getPhotos } from '../api/instaApi';

export function* fetchUser({ inputValue }) {
  try {
    const payload = yield call(getUser, inputValue);
    let photos = payload.user.media.nodes;

    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
    yield put({ type: 'PHOTOS_REQUEST_COMPLETE', photos });

    if (payload.user.media.page_info.has_next_page) {
      const firstEndCursor = payload.user.media.page_info.end_cursor;

      const nextPayload = yield call(getPhotos, inputValue, firstEndCursor);
      photos = nextPayload.user.media.nodes;

      yield put({ type: 'PHOTOS_REQUEST_COMPLETE', photos });

      let nextEndCursor = nextPayload.user.media.page_info.end_cursor;
      while (nextEndCursor) {
        const currentPayload = yield call(getPhotos, inputValue, nextEndCursor);
        photos = currentPayload.user.media.nodes;

        const currentEndCursor = currentPayload.user.media.page_info.end_cursor;
        if (currentEndCursor) {
          nextEndCursor = currentEndCursor;
          yield put({ type: 'PHOTOS_REQUEST_COMPLETE', photos });
        } else {
          nextEndCursor = null;
          yield put({ type: 'ALL_PHOTOS_REQUEST_COMPLETE' });
        }
      }
    } else {
      yield put({ type: 'ALL_PHOTOS_REQUEST_COMPLETE' });
    }
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
  }
}

export function* watchInstaRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
}

export function* instaSagas() {
  yield fork(watchInstaRequest);
}
