import { atom, selector } from 'recoil';
import { mindmapNodesState } from 'recoil/mindmap';

export const selectedNodeIdState = atom<number | null>({
  key: 'selectedNodeIdAtom',
  default: null,
});

export const selectedNodeState = selector({
  key: 'selectedNodeState',
  get: ({ get }) => {
    const nodes = get(mindmapNodesState);
    const selectedNodeId = get(selectedNodeIdState);
    return selectedNodeId ? nodes.get(selectedNodeId) : null;
  },
});
