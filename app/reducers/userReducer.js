const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { response } = action.payload;
      return { ...response[0] };
    }
    default:
      break;
  }
  return state;
}
