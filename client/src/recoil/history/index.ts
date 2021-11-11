import { eventType } from 'hooks/useHistoryEmitter';
import { atom } from 'recoil';

export interface IHistories {
  histories: IHistory[];
}

export type IData = unknown;

export interface IHistory {
  type: eventType;
  projectId: string;
  user: string;
  data: IData;
}

export const historyState = atom<IHistories>({
  key: 'historyAtom',
  default: { histories: [] },
});

export const getParsedHistory = (data: string[]): IHistory => {
  const stringJson =
    data.reduce((acc: any, v: any, i: any) => {
      if (!(i % 2)) {
        acc += `"${v}":`;
      } else {
        acc += v[0] === '{' ? `${v}` : `"${v}"`;
        if (i !== data.length - 1) acc += ', ';
      }
      return acc;
    }, '{') + '}';
  return JSON.parse(stringJson);
};
