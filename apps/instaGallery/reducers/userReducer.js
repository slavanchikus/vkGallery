const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { user } = action.payload;
      return user;
    }
    case 'USER_REQUEST_ERROR': {
      return { ...initialState, error: true };
    }
    default:
      break;
  }
  return state;
}
