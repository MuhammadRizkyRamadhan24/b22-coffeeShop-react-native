import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getCategory = token => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(`${REACT_APP_BASE_URL}/category`);
    dispatch({
      type: 'AUTH_CATEGORY',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_CATEGORY_FAILED',
      payload: err.response.data.message,
    });
  }
};
