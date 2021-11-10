import { atom, selector } from 'recoil';
import { Levels } from 'utils/helpers';

export interface IMindmapData {
  rootId: number;
  mindNodes: IMindNodes;
}

export interface IMindNode {
  nodeId: number;
  level: Levels;
  content: string;
  children: Array<number>;
}

export type IMindNodes = Map<number, IMindNode>;

export const getNextMapState = (prevState: IMindmapData) => {
  const nextState = new Map(prevState.mindNodes);
  nextState.forEach((value, key, mapObject) => mapObject.set(key, { ...value, children: [...value.children] }));

  return {
    ...prevState,
    mindNodes: new Map(prevState.mindNodes),
  };
};

///더미코드 삭제 예정
const getDummyMindmapData = (): IMindmapData => {
  const mindNodes = new Map();
  Array(10)
    .fill(0)
    .map((v, i) => ({ nodeId: i + 10, level: 'TASK', content: 'TASK', children: [] }))
    .forEach((v) => mindNodes.set(v.nodeId, v));
  [
    { nodeId: 9, level: 'STORY', content: 'STORY', children: [10, 11] },
    { nodeId: 8, level: 'STORY', content: 'STORY', children: [12, 19] },
    { nodeId: 7, level: 'STORY', content: 'STORY', children: [] },
    { nodeId: 6, level: 'STORY', content: 'STORY', children: [13, 14, 15] },
    { nodeId: 5, level: 'STORY', content: 'STORY', children: [16] },
    { nodeId: 4, level: 'STORY', content: 'STORY', children: [17, 18] },
    { nodeId: 3, level: 'EPIC', content: 'EPIC', children: [] },
    { nodeId: 2, level: 'EPIC', content: 'EPIC', children: [4, 5, 6, 7] },
    { nodeId: 1, level: 'EPIC', content: 'EPIC', children: [8, 9] },
    { nodeId: 0, level: 'ROOT', content: 'ROOT', children: [1, 2, 3] },
  ].forEach((v) => mindNodes.set(v.nodeId, v));
  return {
    rootId: 0,
    mindNodes: mindNodes,
  };
};

export const mindmapState = atom<IMindmapData>({
  key: 'mindmapAtom',
  default: getDummyMindmapData(),
});

export const mindNodesState = selector({
  key: 'mindNodesState',
  get: ({ get }) => {
    return get(mindmapState).mindNodes;
  },
});
