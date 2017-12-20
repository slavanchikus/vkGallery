const initialState = [];

export default function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FRIENDS_REQUEST_COMPLETE': {
      const { response } = action.payload;
      return response.items;
    }
    default:
      break;
  }
  return state;
}
