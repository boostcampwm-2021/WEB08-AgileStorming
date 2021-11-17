import { atom } from 'recoil';
import { IHistory } from 'types/history';

export const historyState = atom<IHistory>({
  key: 'historyAtom',
  default: { history: [] },
});
