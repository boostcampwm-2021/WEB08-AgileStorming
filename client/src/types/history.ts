import { THistoryEventData, THistoryEventType } from 'types/event';

export type THistoryRowData = [string, ['type', string, 'projectId', string, 'user', string, 'data', string]];

export interface IHistoryData {
  projectId: string;
  user: string;
  type: THistoryEventType;
  data: THistoryEventData;
  newNodeId?: number;
  historyId: number;
  streamId: string;
}

export interface IHistoryControllerProps {
  fromIdx: number;
  toIdx: number;
}

export interface IHandleMoveProps {
  historyData: IHistoryData;
  idx: number;
  fromIdx: number;
}
