import { combineReducers } from 'redux';

import photos from './photosReducer';
import albums from './albumsReducer';
import user from './userReducer';
import friends from './friendsReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  user,
  photos,
  albums,
  friends,
  uiState
});

export default rootReducer;
