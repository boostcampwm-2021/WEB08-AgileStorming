import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const project = {
  create: (name: string) =>
    api.post(
      '/project/create',
      {
        name,
      },
      {
        headers: {
          'x-access-token': 'empty',
        },
      }
    ),
};
