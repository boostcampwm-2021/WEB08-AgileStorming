import { atom } from 'recoil';

export interface IMindNode {
  nodeId: number;
  level: string;
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
  level: 'root',
  content: '',
  children: [],
};

export const mindMapState = atom<IMindMap>({
  key: 'mindMapAtom',
  default: { rootId: initRootId, mindNodes: new Map([[initRootId, initRootNode]]) },
});
