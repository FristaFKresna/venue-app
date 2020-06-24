import Axios from 'axios';
export const BASE_URL = 'http://192.168.100.42:8080/api';
export const api = Axios.create({ baseURL: BASE_URL });

export const setToken = (token) => {
    if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'] 
};
