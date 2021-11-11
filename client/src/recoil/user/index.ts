import { atom } from 'recoil';

export interface IUser {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const userState = atom<IUser>({
  key: 'userAtom',
  default: { id: 'chosh', name: '조성현', color: '000000', icon: 'chicken' },
});
