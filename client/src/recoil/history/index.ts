import { atom } from 'recoil';
import { THistoryEventType } from 'types/event';
import { IHistoryData, THistoryRowData } from 'types/history';

export const historyDataState = atom<IHistoryData[]>({
  key: 'historyDataAtom',
  default: [],
});

export const farthestHistoryIdState = atom<string | undefined>({
  key: 'farthestHistoryAtom',
  default: undefined,
});

export const parseHistory = (rowData: THistoryRowData) => ({
  // historyId: rowData[0],
  type: rowData[1][1] as THistoryEventType,
  projectId: rowData[1][3],
  user: rowData[1][5],
  data: JSON.parse(rowData[1][7]),
});
