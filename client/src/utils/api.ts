import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const authApi = {
  login: (id: string) =>
    api.post('/auth/login', {
      id,
    }),

  register: (id: string, name: string) =>
    api.post('/auth/register', {
      id,
      name,
    }),
};

export const project = {
  get: () => {
    api.get('/project');
  },
  create: (name: string) =>
    api.post('/project/create', {
      name,
    }),
  delete: (projectId: string) =>
    api.delete('/project/delete', {
      data: { projectId },
    }),
};

export const API = {
  project,
};
