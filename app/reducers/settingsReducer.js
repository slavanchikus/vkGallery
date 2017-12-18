const initialState = {
  album: 'wall',
  lastInputValue: ''
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { inputValue } = action.payload;
      return {
        ...state,
        lastInputValue: inputValue
      };
    }
    case 'PICK_ALBUM': {
      const { album } = action;
      return {
        ...state,
        album
      };
    }
    default:
      break;
  }
  return state;
}
