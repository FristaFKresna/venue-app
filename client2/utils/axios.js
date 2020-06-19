import Axios from 'axios';
export const BASE_URL = 'http://zano-4ae84091.localhost.run/api';
export const api = Axios.create({ baseURL: BASE_URL });

export const setToken = (token) => {
    if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'] 
};
