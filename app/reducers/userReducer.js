const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { error, inputValue } = action.payload;
      if (error) {
        return { error: true };
      }
      return {
        ...action.payload.response[0],
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
