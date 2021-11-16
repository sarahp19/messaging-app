const initialState = {
  room: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
