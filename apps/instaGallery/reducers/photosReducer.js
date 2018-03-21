const initialState = [];

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'PHOTOS_REQUEST_COMPLETE': {
      const { photos } = action;
      return [...state, ...photos];
    }
    case 'PHOTOS_SORT_LIKES': {
      const currentState = [...state];
      return currentState && currentState.sort((a, b) => b.node.edge_media_preview_like.count - a.node.edge_media_preview_like.count);
    }
    case 'PHOTOS_SORT_COMMENTS': {
      const currentState = [...state];
      return currentState && currentState.sort((a, b) => b.node.edge_media_to_comment.count - a.node.edge_media_to_comment.count);
    }
    case 'USER_REQUEST_COMPLETE':
    case 'USER_REQUEST_ERROR': {
      return initialState;
    }
    default:
      break;
  }
  return state;
}
