import { combineReducers } from 'redux';

import user from '../../vkGallery/reducers/userReducer';
import uiState from '../../vkGallery/reducers/uiStateReducer';
import audio from './audioReducer';

const appReducer = combineReducers({
  user,
  audio,
  uiState
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    const initialState = {
      audio: [],
      user: {},
      uiState: {}
    };
    return appReducer(initialState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
