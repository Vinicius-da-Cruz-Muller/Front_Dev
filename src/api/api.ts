import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const addToken = (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const getToken = () => {
  return localStorage.getItem('token');
}

const token = getToken();
if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}


export default api;