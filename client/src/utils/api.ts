import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER + 'api',
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
  get: async () => {
    const projectList = await api.get('/project');
    return projectList.data;
  },
  create: async (name: string) => {
    const newProject = await api.post('/project/create', {
      name,
    });
    return newProject.data;
  },
  delete: (projectId: string) =>
    api.delete('/project/delete', {
      data: { projectId },
    }),
};

export const API = {
  project,
};
