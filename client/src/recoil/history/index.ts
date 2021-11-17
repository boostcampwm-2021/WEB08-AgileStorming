import { atom } from 'recoil';

export type THistoryData = [string, ['type', string, 'projectId', string, 'user', string, 'data', string]];

export const historyDataState = atom<THistoryData[]>({
  key: 'historyDataAtom',
  default: [],
});

export const farthestHistoryIdState = atom<string | undefined>({
  key: 'farthestHistoryAtom',
  default: undefined,
});

export const parseHistory = (rowData: THistoryData) => ({
  historyId: rowData[0],
  type: rowData[1][1],
  projectId: rowData[1][3],
  user: rowData[1][5],
  data: JSON.parse(rowData[1][7]),
});
