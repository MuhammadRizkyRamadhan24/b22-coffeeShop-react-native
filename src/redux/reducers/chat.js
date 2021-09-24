const initialState = {
  user: [],
  chatHome: [],
  chatRoom: [],
  msg: '',
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_CHAT': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'DELETE_CHAT_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'SEARCHUSER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'SEARCHUSER_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'CHATHOME': {
      return {
        ...state,
        chatHome: action.payload,
      };
    }
    case 'CHATHOME_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'CHATROOM': {
      return {
        ...state,
        chatRoom: action.payload,
      };
    }
    case 'CHATROOM_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'POST_CHAT': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'POST_CHAT_FAILED': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default chat;
