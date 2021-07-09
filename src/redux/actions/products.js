import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getDataByCategories = (id, token) => async dispatch => {
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/category/${id}/items`,
    );
    dispatch({
      type: 'GET_PRODUCT',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'GET_PRODUCT_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDataById = (id, token) => async dispatch => {
  try {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/items/${id}`);
    dispatch({
      type: 'GET_PRODUCT_BY_ID',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'GET_PRODUCT_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};
