import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getUser, getPhotos } from '../api/instaApi';

export function* fetchUser({ inputValue }) {
  try {
    const payload = yield call(getUser, inputValue);
    let photos = payload.graphql.user.edge_owner_to_timeline_media.edges;

    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
    yield put({ type: 'PHOTOS_REQUEST_COMPLETE', photos });

    if (payload.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page && !payload.graphql.user.is_private) {
      const firstEndCursor = payload.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;

      const nextPayload = yield call(getPhotos, payload.graphql.user.id, firstEndCursor);
      photos = nextPayload.data.user.edge_owner_to_timeline_media.edges;

      yield put({ type: 'PHOTOS_REQUEST_COMPLETE', photos });

      let nextEndCursor = nextPayload.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
      while (nextEndCursor) {
        const currentPayload = yield call(getPhotos, payload.graphql.user.id, nextEndCursor);
        photos = currentPayload.data.user.edge_owner_to_timeline_media.edges;

        const currentEndCursor = currentPayload.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        if (currentEndCursor) {
          nextEndCursor = currentEndCursor;
          yield delay(100);
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
