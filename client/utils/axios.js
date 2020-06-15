import Axios from "axios";
export const BASE_URL = 'http://192.168.100.42:5000/api'
export const api = Axios.create({baseURL: BASE_URL })