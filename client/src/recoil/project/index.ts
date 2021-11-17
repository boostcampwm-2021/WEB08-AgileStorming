import { atom } from 'recoil';
import { ILabel } from 'types/label';
import { ISprint } from 'types/sprint';
import { IUser } from 'types/user';

export const projectIdState = atom<string | null>({
  key: 'projectIdAtom',
  default: null,
});

export const sprintListState = atom<ISprint[]>({
  key: 'sprintList',
  default: [],
});

export const userListState = atom<IUser[]>({
  key: 'userList',
  default: [],
});

export const labelListState = atom<ILabel[]>({
  key: 'labelList',
  default: [],
});
