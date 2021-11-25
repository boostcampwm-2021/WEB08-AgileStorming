import { atom } from 'recoil';
import { IUser } from 'types/user';

export const isAuthenticatedState = atom({
  key: 'isAuthenticated',
  default: false,
});

export const userState = atom<IUser | null>({
  key: 'user',
  default: null,
});
