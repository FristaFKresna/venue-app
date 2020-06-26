import Axios from 'axios';
export const BASE_URL = 'http://zano-50b685b9.localhost.run/api';
// export const BASE_URL = 'http://68.183.183.98:5000/api'
export const api = Axios.create({ baseURL: BASE_URL });

export const setToken = (token) => {
    if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'] 
};
