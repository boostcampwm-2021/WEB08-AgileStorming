import { atom } from 'recoil';

export interface IMindNode {
  id: number;
  level: string;
  content: string;
  children: Array<number>;
}

export interface IMindMap {
  root: IMindNode;
  mindNodes: Map<number, IMindNode>;
}

const initRoot = {
  id: 0,
  level: 'root',
  content: '',
  children: [],
};

export const mindMapState = atom<IMindMap>({
  key: 'mindMapAtom',
  default: { root: initRoot, mindNodes: new Map() },
});
