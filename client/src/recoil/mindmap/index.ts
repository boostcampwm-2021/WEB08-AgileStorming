import { atom, selector } from 'recoil';
import { IMindmapData } from 'types/mindmap';

export const getNextMapState = (prevState: IMindmapData) => {
  const nextNodes = new Map(prevState.mindNodes!);
  nextNodes.forEach((value, key, mapObject) => mapObject.set(key, { ...value, children: [...value.children] }));

  return {
    ...prevState,
    mindNodes: nextNodes,
  };
};

const TEMP_NODE_ID = -1;

export const mindmapState = atom<IMindmapData>({
  key: 'mindmapAtom',
  default: { rootId: TEMP_NODE_ID, mindNodes: new Map() },
});

export const mindmapNodesState = selector({
  key: 'mindmapNodesState',
  get: ({ get }) => {
    const { mindNodes } = get(mindmapState);
    return mindNodes;
  },
});
