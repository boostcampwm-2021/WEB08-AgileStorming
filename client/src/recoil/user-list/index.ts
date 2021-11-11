import { atom } from 'recoil';
import { IUser } from '../user';

export interface IUserInfo extends IUser {
  online: boolean;
}

export const userListOpenState = atom<boolean>({
  key: 'userListOpen',
  default: false,
});

export const userListState = atom<Record<string, IUserInfo>>({
  key: 'userListAtom',
  default: {
    juyahn: {
      online: true,
      id: 'juyahn',
      name: 'juyoung',
      icon: 'panda',
      color: '222222',
    },
    yahn: {
      online: true,
      id: 'yahn',
      name: 'ahn',
      icon: 'panda',
      color: '222222',
    },
  },
});
