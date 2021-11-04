import { atom } from 'recoil';

export interface IToast {
  id: number;
  show: boolean;
  message: string;
}

export const toastState = atom<IToast[]>({
  key: 'toastAtom',
  default: [],
});
