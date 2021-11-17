import { Levels } from 'utils/helpers';
import { TTask } from './event';

export type IMindNodes = Map<number, IMindNode>;

export interface IMindmapData {
  rootId: number;
  mindNodes: IMindNodes;
}

export interface IMindNode extends TTask {
  nodeId: number;
  level: Levels;
  content: string;
  children: Array<number>;
  backlogId?: string;
  createdAt?: string;
  comment?: [];
}
