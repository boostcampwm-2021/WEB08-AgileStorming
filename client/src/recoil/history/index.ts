import { EventType } from 'hooks/useHistoryEmitter';
import { atom } from 'recoil';

export interface IHistories {
  histories: IHistory[];
}

export interface IData {
  nodeFrom?: number | null;
  nodeTo?: number | null;
  dataFrom?: TDataTypes | null;
  dataTo?: TDataTypes | null;
}

export interface IHistory {
  type: EventType;
  projectId: string;
  user: string;
  data: IData;
  id: number;
}

export interface AddData {
  content: string;
  children: string;
}

interface DeleteData {
  id: number;
  content: string;
  index: number;
  status: string;
  posX: number;
  posY: number;
  assignee: string;
  priority: string;
}

interface MoveData {
  posX: number;
  posY: number;
}

interface UpdateParentData {
  id: number;
}

interface UpdateChildrenData {
  parentId: number;
  children: number[];
}

interface UpdateInfoData {
  changed: { assignee: string };
}

export type TDataTypes = AddData | DeleteData | MoveData | UpdateParentData | UpdateChildrenData | UpdateInfoData;

export const historyState = atom<IHistories>({
  key: 'historyAtom',
  default: { histories: [] },
});

export const getParsedHistory = (data: string[], id?: number): IHistory => {
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
      id ? `{"id": ${id},` : '{'
    ) + '}';
  return JSON.parse(stringJson);
};
