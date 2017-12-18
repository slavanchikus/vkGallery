import { combineReducers } from 'redux';

import photos from './photosReducer';
import albums from './albumsReducer';
import user from './userReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  user,
  photos,
  albums,
  friends,
});

export default rootReducer;
