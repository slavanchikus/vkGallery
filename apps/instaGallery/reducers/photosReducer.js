const initialState = [];

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'PHOTOS_REQUEST_COMPLETE': {
      const { photos } = action;
      return [...state, ...photos];
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
