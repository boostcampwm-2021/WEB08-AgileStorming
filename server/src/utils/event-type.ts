export type TAddNodeData = {
  content: string;
};
export type TPriority = '낮음' | '보통' | '높음';
export type TStatus = 'To Do' | 'In Progress' | 'Done';
export interface TDeleteNodeData extends TTask {
  nodeId: number;
  content: string;
  children: Array<number>;
  backlogId?: string;
  createdAt?: string;
  comment?: [];
  posX?: string;
  posY?: string;
}
export type TMoveNodeData = {
  posX?: string;
  posY?: string;
};
export type TUpdateNodeParent = {
  nodeId: number;
  nodeType: 'EPIC' | 'STORY' | 'TASK';
  nodeParentType: 'ROOT' | 'EPIC' | 'STORY';
};
export type TUpdateNodeSibling = {
  parentId: number;
  children: number[];
};
export type TUpdateNodeContent = {
  content: string;
};
export type TTask = {
  assigneeId?: number;
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
export type TDeleteSprint = {
  sprintId: number;
};
export type TDeleteLabel = {
  labelId: number;
};

export type THistoryEventType =
  | 'ADD_NODE'
  | 'DELETE_NODE'
  | 'MOVE_NODE'
  | 'UPDATE_NODE_PARENT'
  | 'UPDATE_NODE_SIBLING'
  | 'UPDATE_NODE_CONTENT'
  | 'UPDATE_TASK_INFORMATION';
export type THistoryEventData = {
  nodeFrom: number | null;
  nodeTo: number | null;
  dataFrom: TDeleteNodeData | TMoveNodeData | TUpdateNodeParent | TUpdateNodeSibling | TUpdateNodeContent | TUpdateTaskInformation | null;
  dataTo: TAddNodeData | TMoveNodeData | TUpdateNodeParent | TUpdateNodeSibling | TUpdateNodeContent | TUpdateTaskInformation | null;
};

export type TEventType = 'ADD_SPRINT' | 'ADD_LABEL' | 'DELETE_SPRINT' | 'DELETE_LABEL';
export type TEventData = TAddSprint | TAddLabel | TDeleteSprint | TDeleteLabel;
