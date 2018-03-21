const initialState = {};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { user } = action.payload.graphql;
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
