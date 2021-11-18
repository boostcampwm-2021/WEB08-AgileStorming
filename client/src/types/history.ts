import { IUser } from 'types/user';
import { THistoryEventData, THistoryEventType } from 'types/event';

export type THistoryRowData = [string, ['type', string, 'projectId', string, 'user', string, 'data', string]];

export interface IHistoryData {
  id?: number;
  projectId: string;
  user: IUser;
  type: THistoryEventType;
  data: THistoryEventData;
  newNodeId?: number;
}
