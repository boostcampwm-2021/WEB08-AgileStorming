import { atom } from 'recoil';

export interface IToast {
  show: boolean;
  message: string;
}

export const toastState = atom<IToast>({
  key: 'toastAtom',
  default: { show: false, message: '' },
});
