const initialState = {
  loggedIn: false,
  user: null,
  foreignProfile: {
    active: false,
    userId: '',
  },
  room: {
    active: false,
    data: {
      foreignId: '',
    },
  },
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
    case 'counter/foreignProfile':
      return {
        ...state,
        foreignProfile: {
          active: action.payload.active,
          userId: action.payload.userId,
        },
      }
    case 'counter/socketClient':
      return {
        ...state,
        socket: action.payload.socket,
      }
    case 'counter/roomIsOpen': {
      const { active, data: { foreignId } } = action.payload;
      return {
        ...state,
        room: {
          active,
          data: { foreignId },
        },
      }
    }
    default:
      return state;
  }
}

export default reducer;
