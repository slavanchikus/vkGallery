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
      const { error } = action.payload;
      const response = action.payload.response.slice(1);

      if (error) {
        return initialState;
      }

      const currentUserId = state[0] ? state[0].owner_id : null;
      const responseUserId = response[0] ? response[0].owner_id : null;
      const currentAlbumId = state[0] ? state[0].aid : null;
      const responseAlbumId = response[0] ? response[0].aid : null;

      if (currentUserId !== responseUserId || currentAlbumId !== responseAlbumId) {
        return response;
      }
      return [...state, ...response];
    }
    case 'PHOTOS_SORT_LIKES': {
      const currentState = [...state];
      return currentState && currentState.sort((a, b) => b.likes.count - a.likes.count);
    }
    case 'PHOTOS_SORT_COMMENTS': {
      const currentState = [...state];
      return currentState && currentState.sort((a, b) => b.comments.count - a.comments.count);
    }
    default:
      break;
  }
  return state;
}
