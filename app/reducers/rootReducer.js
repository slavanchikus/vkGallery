import { combineReducers } from 'redux';

import photos from './photosReducer';
import user from './userReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  user,
  photos,
  friends,
});

export default rootReducer;
