import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const userApi = {
  githubLogin: () => api.get('/github'),
  getToken: () => api.get('/token'),
};
