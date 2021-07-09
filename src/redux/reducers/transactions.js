const initialState = {
  data: [],
  detailData: '',
  errMsg: '',
  msg: '',
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'GET_HISTORY_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'GET_HISTORY_DETAIL': {
      return {
        ...state,
        detailData: action.payload,
      };
    }
    case 'GET_HISTORY_DETAIL_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'CREATE_TRANSACTION': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'CREATE_TRANSACTION_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'DELETE_TRANSACTION': {
      return {
        ...state,
        msg: action.payload,
      };
    }
    case 'DELETE_TRANSACTION_FAILED': {
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

export default transactions;
