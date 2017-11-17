const initialState = {};

export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'USER_REQUEST_COMPLETE': {
      const { response, inputValue } = action.payload;
      return {
        ...response[0],
        lastInputValue: inputValue
      };
    }
    default:
      break;
  }
  return state;
}
