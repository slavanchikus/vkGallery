const initialState = [];

export default function photoReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      return [];
    }
    case 'PHOTOS_REQUEST_COMPLETE': {
      const { response } = action.payload;
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
