const initialState = {
  loggedIn: false,
  user: null,
  room: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/loggedIn':
      return {
        ...state,
        loggedIn: action.payload.active,
      }
    case 'counter/getUser':
      return {
        ...state,
        user: action.payload.data,
      }
    case 'counter/socketClient':
      return {
        ...state,
        socket: action.payload.socket,
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
