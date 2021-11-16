import { EventType } from 'hooks/useHistoryEmitter';
import { atom } from 'recoil';
import { Levels } from 'utils/helpers';

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

export interface IAddData {
  content: string;
  children: string;
}

export interface IDeleteData {
  id: number;
  content: string;
  index: number;
  status: string;
  posX: number;
  posY: number;
  assignee: string;
  priority: string;
}

export interface IMoveData {
  posX: number;
  posY: number;
}

export interface IUpdateParentData {
  nodeId: number;
  nodeParentType: Levels;
}

export interface IUpdateChildrenData {
  parentId: number;
  children: number[];
}

export interface IUpdateInfoData {
  changed: { assignee: string };
}

export type TDataTypes = IAddData | IDeleteData | IMoveData | IUpdateParentData | IUpdateChildrenData | IUpdateInfoData;

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
