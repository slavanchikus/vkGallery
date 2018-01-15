import { combineReducers } from 'redux';

import user from './userReducer';
import photos from './photosReducer';
import uiState from './uiStateReducer';

const rootReducer = combineReducers({
  user,
  photos,
  uiState
});

export default rootReducer;
