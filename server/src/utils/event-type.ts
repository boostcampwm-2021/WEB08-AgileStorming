export type TDeleteNodeData = {
  nodeId: number;
  content: string;
  index: number;
  status?: 'To Do' | 'In Progress' | 'Done';
  posX?: string;
  posY?: string;
  assignee?: number;
  priority?: string;
};
export type TAddNodeData = {
  content: string;
};
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
  priority?: string;
  dueDate?: string;
  estimatedTime?: string;
  status?: 'To Do' | 'In Progress' | 'Done';
  finishedTime?: string;
  sprintId?: number;
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

export type TEventType = 'ADD_SPRINT' | 'ADD_LABEL' | 'ADD_COMMENT' | 'DELETE_SPRINT' | 'DELETE_LABEL' | 'DELETE_COMMENT';
export type TEventData = TAddSprint | TAddLabel | TAddComment | TDeleteSprint | TDeleteLabel | TDeleteComment;
