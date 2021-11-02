import { atom } from 'recoil';

export interface IUser {
  id: number;
  username: string;
}

export const userState = atom<IUser>({
  key: 'userAtom',
  default: { id: 1, username: 'admin' },
});
