import { api, setToken } from '../../utils/axios';
import { SET_USER, SET_AUTH_ERROR, SIGN_OUT } from './actionTypes';
import  AsyncStorage from '@react-native-community/async-storage';

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const { data: { token } } = await api.post('/auth/login', { email, password });
    setToken(token);
    await AsyncStorage.setItem('token', token)
    const { data } = await api.post('/auth/deserialize');
    dispatch({ type: SET_USER, payload: { token, ...data } });
  } catch (err) {
    dispatch({ type: SET_AUTH_ERROR, payload: err.response.data.errors });
  }
};

export const register = (body) => async (dispatch) => {
  try {
    const { data: { token } } = await api.post('/auth/register', body);
    setToken(token);
    await AsyncStorage.setItem('token', token)
    const { data } = await api.post('/auth/deserialize');
    dispatch({ type: SET_USER, payload: { token, ...data } });
  } catch (err) {
    dispatch({ type: SET_AUTH_ERROR, payload: err.response.data.errors });
  }
};

export const signOut = () => async dispatch => {
  await AsyncStorage.removeItem('token')
  setToken(null)
  dispatch({type:SIGN_OUT})
}
