import { fork } from 'redux-saga/effects';

import { instaSagas } from './instaSagas';

export default function* sagas() {
  yield fork(instaSagas);
}
