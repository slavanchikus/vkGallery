const initialState = [];

export default function photoReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { error } = action.payload;
      if (error) {
        return initialState;
      }
      return state;
    }
    case 'PHOTOS_REQUEST_COMPLETE': {
      const { response } = action.payload;
      const currentUserId = state[0] ? state[0].owner_id : null;
      const responseUserId = response[0] ? response[0].owner_id : null;
      if (currentUserId !== responseUserId) {
        return response;
      }
      return [...state, ...response];
    }
    case 'PHOTOS_SORT_LIKES': {
      const currentState = [...state];
      const sortedState = currentState && currentState.sort((a, b) => b.likes.count - a.likes.count);
      return [...sortedState];
    }
    case 'PHOTOS_SORT_COMMENTS': {
      const currentState = [...state];
      const sortedState = currentState && currentState.sort((a, b) => b.comments.count - a.comments.count);
      return [...sortedState];
    }
    default:
      break;
  }
  return state;
}
