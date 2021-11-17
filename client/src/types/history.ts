import { IUser } from 'types/user';
import { THistoryEventData, THistoryEventType } from 'types/event';

export interface IHistory {
  history: IHistoryData[];
}

export interface IHistoryData {
  id?: number;
  projectId: string;
  user: IUser;
  type: THistoryEventType;
  data: THistoryEventData;
  newNodeId?: number;
}
