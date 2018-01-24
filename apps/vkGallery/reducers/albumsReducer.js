const initialState = {
  selectedAlbumId: 'wall',
  selectedAlbumName: 'стена'
};

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ALBUM_REQUEST_COMPLETE': {
      return {
        ...initialState,
        items: action.payload.response
      };
    }
    case 'USER_REQUEST_COMPLETE': {
      return initialState;
    }
    case 'PICK_ALBUM': {
      const { albumId, albumName } = action;
      return {
        ...state,
        selectedAlbumId: albumId,
        selectedAlbumName: albumName
      };
    }
    default:
      break;
  }
  return state;
}
