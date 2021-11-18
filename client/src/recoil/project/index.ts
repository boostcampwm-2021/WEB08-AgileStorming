import { atom } from 'recoil';
import { ILabel } from 'types/label';
import { ISprint } from 'types/sprint';
import { IUser } from 'types/user';

export const projectIdState = atom<string | null>({
  key: 'projectIdAtom',
  default: null,
});

export const sprintListState = atom<Record<number, ISprint>>({
  key: 'sprintList',
  default: {},
});

export const userListState = atom<Record<string, IUser>>({
  key: 'userList',
  default: {},
});

export const connectedUserState = atom<Record<string, boolean>>({
  key: 'connectedUser',
  default: {},
});

export const labelListState = atom<Record<number, ILabel>>({
  key: 'labelList',
  default: {},
});
