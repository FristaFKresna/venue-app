import { api, setToken } from '../../utils/axios';
import { SET_USER, SET_AUTH_ERROR } from './actionTypes';

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const { data: { token } } = await api.post('/auth/login', { email, password });
    setToken(token);
    const { data } = await api.post('/auth/deserialize');
    dispatch({ type: SET_USER, payload: { token, username: data.username, id: data.id, isVerified: data.isVerified } });
  } catch (err) {
    dispatch({ type: SET_AUTH_ERROR, payload: err.response.data.errors });
  }
};

export const register = (body) => async (dispatch) => {
  try {
    const { data: { token } } = await api.post('/auth/register', body);
    setToken(token);
    const { data } = await api.post('/auth/deserialize');
    dispatch({ type: SET_USER, payload: { token, username: data.username, id: data.id, isVerified: data.isVerified } });
  } catch (err) {
    dispatch({ type: SET_AUTH_ERROR, payload: err.response.data.errors });
  }
};
