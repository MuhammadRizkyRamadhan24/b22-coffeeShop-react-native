const initialState = {
  data: [],
  errMsg: '',
  msg: '',
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_CATEGORY': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'AUTH_CATEGORY_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default categories;
