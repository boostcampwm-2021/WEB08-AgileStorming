import { atom } from 'recoil';
import { IHistory, IHistoryData } from 'types/history';

export const historyState = atom<IHistory>({
  key: 'historyAtom',
  default: { history: [] },
});

export const getParsedHistory = (data: string[], newNodeId?: number): IHistoryData => {
  const stringJson =
    data.reduce(
      (acc: string, v: string, i: number) => {
        if (!(i % 2)) {
          acc += `"${v}":`;
        } else {
          acc += v[0] === '{' ? `${v}` : `"${v}"`;
          if (i !== data.length - 1) acc += ', ';
        }
        return acc;
      },
      newNodeId ? `{"newNodeId": ${newNodeId},` : '{'
    ) + '}';
  return JSON.parse(stringJson);
};
