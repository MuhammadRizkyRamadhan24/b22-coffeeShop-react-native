import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const getHistory = token => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/transaction`,
    );
    dispatch({
      type: 'GET_HISTORY',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'GET_HISTORY_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getDetailHistory = (token, id) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/transaction/${id}/detail`,
    );
    dispatch({
      type: 'GET_HISTORY_DETAIL',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'GET_HISTORY_DETAIL_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const createTransaction =
  (
    item_id,
    item_amount,
    item_variant,
    item_additional_price,
    delivery_method,
    payment_method,
    token,
  ) =>
  async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new URLSearchParams();
    item_id.map(value => form.append('item_id', value));
    item_amount.map(value => form.append('item_amount', value));
    item_variant.map(value => form.append('item_variant', value));
    item_additional_price.map(value =>
      form.append('item_additional_price', value),
    );
    form.append('delivery_method', delivery_method);
    form.append('payment_method', payment_method);
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/private/transaction`,
        form.toString(),
      );
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'CREATE_TRANSACTION_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const deleteTransaction = (token, id) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).delete(
      `${REACT_APP_BASE_URL}/private/transaction/${id}`,
    );
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_TRANSACTION_FAILED',
      payload: err.response.data.message,
    });
  }
};
