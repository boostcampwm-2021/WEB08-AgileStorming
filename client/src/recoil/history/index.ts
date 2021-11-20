import { atom } from 'recoil';
import { IHistoryData } from 'types/history';

export const historyDataListState = atom<IHistoryData[]>({
  key: 'historyDataListAtom',
  default: [],
});

export const farthestHistoryIdState = atom<string | undefined>({
  key: 'farthestHistoryAtom',
  default: undefined,
});

export const currentReverseIdxState = atom<number>({ key: 'currentReverseIdxAtom', default: -1 });
