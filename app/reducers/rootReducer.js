import { combineReducers } from 'redux';

import photos from './photosReducer';
import user from './userReducer';
import friends from './friendsReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  settings,
  user,
  photos,
  friends,
});

export default rootReducer;
