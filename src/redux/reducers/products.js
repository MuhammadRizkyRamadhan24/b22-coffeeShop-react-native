const initialState = {
  data: [],
  detailData: [],
  errMsg: '',
  msg: '',
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'GET_PRODUCT_FAILED': {
      return {
        ...state,
        errMsg: action.payload,
      };
    }
    case 'GET_PRODUCT_BY_ID': {
      return {
        ...state,
        detailData: action.payload,
      };
    }
    case 'GET_PRODUCT_BY_ID_FAILED': {
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

export default products;
