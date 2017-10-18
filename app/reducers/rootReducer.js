import { combineReducers } from 'redux';

import photos from './photosReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  photos
});

export default rootReducer;
