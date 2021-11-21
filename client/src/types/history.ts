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
