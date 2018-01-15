import { combineReducers } from 'redux';

import photos from './photosReducer';
import albums from './albumsReducer';
import user from './userReducer';
import friends from './friendsReducer';
import uiState from './uiStateReducer';

const appReducer = combineReducers({
  user,
  photos,
  albums,
  friends,
  uiState
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    const initialState = {
      user: {},
      photos: [],
      albums: {
        selectedAlbumId: 'wall',
        selectedAlbumName: 'стена'
      },
      friends: [],
      uiState: {}
    };
    return appReducer(initialState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
