import { atom } from 'recoil';
import { IHistoryData } from 'types/history';

export const historyDataState = atom<IHistoryData[]>({
  key: 'historyDataAtom',
  default: [],
});

export const farthestHistoryIdState = atom<string | undefined>({
  key: 'farthestHistoryAtom',
  default: undefined,
});
