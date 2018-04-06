import { fork } from 'redux-saga/effects';

import { vkSagas } from '../../vkGallery/sagas/vkSagas';

export default function* sagas() {
  yield fork(vkSagas);
}
