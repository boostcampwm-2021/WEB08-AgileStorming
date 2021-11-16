export type TDeleteNodeData = {
  nodeId: number;
  content: string;
  index: number;
  status?: string;
  posX?: number;
  posY?: number;
  assignee?: number;
  priority?: string;
};
export type TAddNodeData = {
  content: string;
};
export type TMoveNodeData = {
  posX?: number;
  posY?: number;
};
export type TUpdateNodeParent = {
  nodeId: number;
};
export type TUpdateNodeSibling = {
  parentId: number;
  children: number[];
};
export type TUpdateNodeContent = {
  content: string;
};
export type TTask = {
  assignee?: number;
  label?: number[];
  priority?: string;
  dueDate?: string;
  estimatedTime?: string;
  finishedTime?: string;
  sprint?: string;
};
export type TUpdateTaskInformation = {
  changed: TTask;
};
export type THistoryEventType = 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_CONTENT' | 'MOVE_NODE';
export type THistoryEventData = {
  nodeFrom: number | null;
  nodeTo: number | null;
  dataFrom: TDeleteNodeData | TMoveNodeData | TUpdateNodeParent | TUpdateNodeSibling | TUpdateNodeContent | TUpdateTaskInformation | null;
  dataTo: TAddNodeData | TMoveNodeData | TUpdateNodeParent | TUpdateNodeSibling | TUpdateNodeContent | TUpdateTaskInformation | null;
};
