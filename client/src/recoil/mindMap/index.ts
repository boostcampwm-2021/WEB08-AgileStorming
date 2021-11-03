import { atom } from 'recoil';

export type levels = 'ROOT' | 'EPIC' | 'STORY' | 'TASK';

export interface IMindNode {
  nodeId: number;
  level: levels;
  content: string;
  children: Array<number>;
}

export interface IMindMap {
  rootId: number;
  mindNodes: Map<number, IMindNode>;
}

const initRootId = 0;
const initRootNode = {
  nodeId: initRootId,
  level: 'ROOT' as levels,
  content: '',
  children: [],
};

export const mindMapState = atom<IMindMap>({
  key: 'mindMapAtom',
  default: { rootId: initRootId, mindNodes: new Map([[initRootId, initRootNode]]) },
});
