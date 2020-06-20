import Axios from 'axios';
export const BASE_URL = 'https://zano-6e7340b4.localhost.run/api';
export const api = Axios.create({ baseURL: BASE_URL });

export const setToken = (token) => {
    if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'] 
};
