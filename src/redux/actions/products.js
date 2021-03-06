import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getDataByCategories = (id, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
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

export const searchData = (search, page, order, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/items?search=${search}&limit=6&order=${order}&sort=asc&page=${page}`,
    );
    dispatch({
      type: 'SEARCH',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'SEARCH_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDataById = (id, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
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
