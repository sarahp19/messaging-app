const initialState = {
  loggedIn: false,
  room: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/loggedIn':
      return {
        ...state,
        loggedIn: action.payload.counter,
      }
    case 'counter/roomIsOpen':
      return {
        ...state,
        room: action.payload.counter,
      }
    default:
      return state;
  }
}

export default reducer;
