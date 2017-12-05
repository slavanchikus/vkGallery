const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { response, error } = action.payload;
      if (error) {
        return { error: true };
      }
      return {
        ...response[0],
        lastUserId: response[0].id
      };
    }
    default:
      break;
  }
  return state;
}
