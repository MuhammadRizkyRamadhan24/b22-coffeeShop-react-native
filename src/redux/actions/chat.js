import {http} from '../../helpers/http';

import {REACT_APP_BASE_URL} from '@env';

export const searchUser = (search, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/private/chat?search=${search}`,
    );
    dispatch({
      type: 'SEARCHUSER',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'SEARCHUSER_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getChatHome = (id, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/chat/home?id=${id}`,
    );
    dispatch({
      type: 'CHATHOME',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'CHATHOME_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const getChatRoom = (id_login, id_people, token) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).get(
      `${REACT_APP_BASE_URL}/chat?id_sender=${id_login}&id_receiver=${id_people}`,
    );
    dispatch({
      type: 'CHATROOM',
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: 'CHATROOM_FAILED',
      payload: err.response.data.message,
    });
  }
};

export const postChat =
  (id_sender, id_receiver, chat, token) => async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new URLSearchParams();
    form.append('id_sender', id_sender);
    form.append('id_receiver', id_receiver);
    form.append('chat', chat);
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/chat`,
        form.toString(),
      );
      dispatch({
        type: 'POST_CHAT',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'POST_CHAT_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const postAttachment =
  (id_sender, id_receiver, Data, token) => async dispatch => {
    console.log(REACT_APP_BASE_URL);
    const form = new FormData();
    form.append('id_sender', id_sender);
    form.append('id_receiver', id_receiver);
    form.append('image', {
      uri: Data.uri,
      name: Data.fileName,
      type: Data.type,
    });
    try {
      const {data} = await http(token).post(
        `${REACT_APP_BASE_URL}/chat/attachment`,
        form,
      );
      dispatch({
        type: 'POST_CHAT',
        payload: data.message,
      });
    } catch (err) {
      dispatch({
        type: 'POST_CHAT_FAILED',
        payload: err.response.data.message,
      });
    }
  };

export const deleteChat = (token, id) => async dispatch => {
  console.log(REACT_APP_BASE_URL);
  try {
    const {data} = await http(token).put(
      `${REACT_APP_BASE_URL}/chat/delete/${id}`,
    );
    dispatch({
      type: 'DELETE_CHAT',
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_CHAT_FAILED',
      payload: err.response.data.message,
    });
  }
};
