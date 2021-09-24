import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const authLogin = (email, password) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  const form = new URLSearchParams();
  form.append('email', email);
  form.append('password', password);
  try {
    const {data} = await http().post(
      `${REACT_APP_BASE_URL}/auth/login`,
      form.toString(),
    );
    dispatch({
      type: 'AUTH_LOGIN',
      payload: data,
    });
    setTimeout(() => {
      dispatch({type: 'AUTH_RESET'});
    }, 2000);
  } catch (err) {
    dispatch({
      type: 'AUTH_LOGIN_FAILED',
      payload: err.response.data.message,
    });
    setTimeout(() => {
      dispatch({type: 'AUTH_RESET'});
    }, 2000);
  }
};

export const authRegister =
  (email, phone_number, password) => async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new URLSearchParams();
    form.append('email', email);
    form.append('phone_number', phone_number);
    form.append('password', password);
    try {
      const {data} = await http().post(
        `${REACT_APP_BASE_URL}/auth/register`,
        form.toString(),
      );
      dispatch({
        type: 'AUTH_REGISTER',
        payload: data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 2000);
    } catch (err) {
      dispatch({
        type: 'AUTH_REGISTER_FAILED',
        payload: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({type: 'AUTH_RESET'});
      }, 2000);
    }
  };

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});
