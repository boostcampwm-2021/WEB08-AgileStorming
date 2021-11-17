import axios from 'axios';
import { IProject } from 'types/project';

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
  getUserList: async (projectId: string) => {
    const userList = await api.get('/project/user-list', {
      params: { projectId },
    });
    return userList;
  },
  getInfo: async (projectId: string) => {
    const info = await api.get('/project/info', {
      params: { projectId },
    });
    return info.data;
  },
};

export const API = {
  project,
};
