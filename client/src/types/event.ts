import { ILabel } from './label';
import { IMindNode } from './mindmap';
import { ISprint } from './sprint';

export type TAddNodeData = {
  content: string;
  nodeId?: number;
};
export type TPriority = '낮음' | '보통' | '높음';
export type TStatus = 'To Do' | 'In Progress' | 'Done';
export interface TDeleteNodeData extends IMindNode {
  sideEffect: Array<IMindNode>;
}
export type TUpdateNodeParent = {
  nodeId: number;
  nodeType: 'EPIC' | 'STORY' | 'TASK';
  nodeParentType: 'ROOT' | 'EPIC' | 'STORY';
};
export type TUpdateNodeContent = {
  content: string;
};
export type TTask = {
  assigneeId?: string;
  labels?: number[];
  status?: TStatus;
  priority?: TPriority;
  dueDate?: string;
  startDate?: string | null;
  endDate?: string | null;
  estimatedTime?: string | null;
  finishedTime?: string | null;
  sprintId?: number;
  labelIds?: string;
};
export type TUpdateTaskInformation = {
  changed: TTask;
};
export type TAddSprint = {
  name: string;
  startDate: string;
  endDate: string;
};
export type TAddLabel = {
  name: string;
};
export type TAddComment = {
  nodeId: number;
  comment: string;
};
export type TDeleteSprint = {
  sprintId: number;
};
export type TDeleteLabel = {
  labelId: number;
};
export type TDeleteComment = {
  nodeId: number;
  commentId: number;
};

export type THistoryEventType = 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_PARENT' | 'UPDATE_NODE_CONTENT' | 'UPDATE_TASK_INFORMATION';
export type THistoryEventData = {
  nodeFrom?: number | null;
  nodeTo?: number | null;
  dataFrom?: TDeleteNodeData | TUpdateNodeParent | TUpdateNodeContent | TUpdateTaskInformation | null;
  dataTo?: TAddNodeData | TUpdateNodeParent | TUpdateNodeContent | TUpdateTaskInformation | null;
};

export type TEventType = 'ADD_SPRINT' | 'ADD_LABEL' | 'ADD_COMMENT' | 'DELETE_SPRINT' | 'DELETE_LABEL' | 'DELETE_COMMENT';
export type TEventData = TAddSprint | TAddLabel | TAddComment | TDeleteSprint | TDeleteLabel | TDeleteComment;

export interface INonHistoryEventData {
  id?: number;
  projectId: string;
  user: string;
  type: TEventType;
  data: TEventData;
  dbData?: number | ILabel | ISprint;
}
