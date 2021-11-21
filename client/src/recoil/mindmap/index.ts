import { atom, selector } from 'recoil';
import { IMindmapData } from 'types/mindmap';

export const ROOT_NODE_ID = -1;
export const TEMP_NODE_ID = -2;

export const getNextMapState = (prevState: IMindmapData) => {
  const nextNodes = new Map(prevState.mindNodes!);
  nextNodes.forEach((value, key, mapObject) => mapObject.set(key, { ...value, children: [...value.children] }));

  return {
    ...prevState,
    mindNodes: nextNodes,
  };
};

export const mindmapState = atom<IMindmapData>({
  key: 'mindmapAtom',
  default: { rootId: ROOT_NODE_ID, mindNodes: new Map() },
});

export const mindmapNodesState = selector({
  key: 'mindmapNodesState',
  get: ({ get }) => {
    const { mindNodes } = get(mindmapState);
    return mindNodes;
  },
});

export const historyMapDataState = atom<IMindmapData>({
  key: 'historyMapAtom',
  default: { rootId: ROOT_NODE_ID, mindNodes: new Map() },
});

export const historyMapState = selector({
  key: 'historyNodesState',
  get: ({ get }) => {
    const { mindNodes } = get(historyMapDataState)!;
    return mindNodes;
  },
});
