import { atom } from 'recoil';

export interface IUser {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export const userState = atom<IUser>({
  key: 'userAtom',
  default: { id: 1, name: '조성현', color: '000000', icon: 'chicken' },
});
