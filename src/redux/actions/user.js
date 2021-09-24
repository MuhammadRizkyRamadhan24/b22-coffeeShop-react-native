import {http} from '../../helpers/http';
import {REACT_APP_BASE_URL} from '@env';

export const changeUser = (token, Data) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  const form = new FormData();
  if (Data.picture !== undefined) {
    form.append('image', {
      uri: Data.picture.uri,
      name: Data.picture.fileName,
      type: Data.picture.type,
    });
  }
  form.append('display_name', Data.display_name);
  form.append('gender', Data.gender);
  form.append('email', Data.email);
  form.append('phone_number', Data.phone_number);
  form.append('date_birth', Data.date_birth);
  form.append('address', Data.address);
  try {
    const {data} = await http(token).patch(
      `${REACT_APP_BASE_URL}/private/profile`,
      form,
    );
    dispatch({
      type: 'CHANGE_USER',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'CHANGE_USER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const changePassword =
  (token, oldPassword, newPassword) => async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new URLSearchParams();
    form.append('password', oldPassword);
    form.append('newPassword', newPassword);
    try {
      const {data} = await http(token).put(
        `${REACT_APP_BASE_URL}/private/profile/change_password`,
        form.toString(),
      );
      dispatch({
        type: 'CHANGE_PASSWORD',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'CHANGE_PASSWORD_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const getUserById = token => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/profile`,
    );
    dispatch({
      type: 'GET_USER_BY_ID',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'GET_USER_BY_ID_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
