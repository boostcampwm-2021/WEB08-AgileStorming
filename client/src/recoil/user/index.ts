import { atom } from 'recoil';
import { IUser } from 'types/user';

export const userState = atom<IUser>({
  key: 'userAtom',
  default: { id: 'chosh', name: '조성현', color: '000000', icon: 'frog' },
});
