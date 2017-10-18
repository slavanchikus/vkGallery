const initialState = [];

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'PHOTOS_REQUEST_COMPLETE': {
      const { response } = action.payload;
      return [...response];
    }
    case 'PHOTOS_SORT_LIKES': {
      const sortLikes = state && state.sort((a, b) => b.likes.count - a.likes.count);
      return [...sortLikes];
    }
    case 'PHOTOS_SORT_COMMENTS': {
      const sortComments = state && state.sort((a, b) => b.comments.count - a.comments.count);
      return [...sortComments];
    }
    default:
      break;
  }
  return state;
}
