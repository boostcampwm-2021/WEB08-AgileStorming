import { atom } from 'recoil';

export interface ISocket {
  projectId: string | null;
}

export const socketState = atom<ISocket>({
  key: 'socketAtom',
  default: { projectId: null },
});
