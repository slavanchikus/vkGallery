const initialState = {
  isFetching: false
};

export default function uiStateReducer(state = initialState, action) {
  switch (action.type) {
    case 'PHOTOS_REQUEST':
    case 'USER_REQUEST': {
      return {
        isFetching: true
      };
    }
    case 'PHOTOS_REQUEST_COMPLETE': {
      return {
        isFetching: false
      };
    }
    default:
      break;
  }
  return state;
}
