export type TEventType = 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_CONTENT' | 'MOVE_NODE';
export type TEventData = {
  nodeFrom: number | null;
  nodeTo: number | null;
  dataFrom: TDeleteNodeData | TAddNodeData | null;
  dataTo: Record<string, any>;
};
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
export type TMoveNodeDate = {
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
export type TUpdateTaskInfo = {
  changed: TTask;
};
