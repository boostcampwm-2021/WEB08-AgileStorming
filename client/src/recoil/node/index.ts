import { atom, selector } from 'recoil';
import { Levels } from 'utils/helpers';

export interface INode {
  nodeId: number;
  backlogId: string;
  level: Levels;
  content: string;
  children: Array<number>;
  label: number[];
  sprint: string | undefined;
  assignee: string | undefined;
  createdAt: string;
  expectedAt: string | undefined;
  closedAt: string | undefined;
  expectedTime: string | undefined;
  priority: string | undefined;
  comment: [];
}

// const sampleNode: INode = {
//   nodeId: 1,
//   backlogId: '1-2-1',
//   level: 'STORY',
//   content: '화살표 클릭으로 월별로 달력을 이동할 수 있다.',
//   children: [10, 11],
//   label: [1, 2],
//   sprint: '스프린트1',
//   assignee: '조성현',
//   createdAt: '2021-11-10',
//   expectedAt: '2021-12-03',
//   closedAt: undefined,
//   expectedTime: '1시간',
//   priority: '높음',
//   comment: [],
// };

export const nodeMapState = atom<Map<number, INode>>({
  key: 'nodeMapAtom',
  default: new Map(),
});

export const selectedNodeIdState = atom<number | null>({
  key: 'selectedNodeIdAtom',
  default: null,
});

export const selectedNodeState = selector({
  key: 'selectedNodeState',
  get: ({ get }) => {
    const nodes = get(nodeMapState);
    const selectedNodeId = get(selectedNodeIdState);

    return selectedNodeId ? nodes.get(selectedNodeId) : null;
  },
});
