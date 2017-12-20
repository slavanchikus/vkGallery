const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      return state;
    }
    default:
      break;
  }
  return state;
}
