import { Levels } from 'utils/helpers';
import { atom } from 'recoil';

export interface INode {
  nodeId: number;
  backlogId: string;
  level: Levels;
  content: string;
  children: Array<number>;
  label: number[];
  sprint: number | undefined;
  assignee: string | undefined;
  createdAt: string;
  expectedAt: string | undefined;
  closedAt: string | undefined;
  expectedTime: string | undefined;
  priority: string | undefined;
  comment: [];
}

const sampleNode: INode = {
  nodeId: 1,
  backlogId: '1-2-1',
  level: 'STORY',
  content: '화살표 클릭으로 월별로 달력을 이동할 수 있다.',
  children: [10, 11],
  label: [1, 2],
  sprint: undefined,
  assignee: '조성현',
  createdAt: new Date().toISOString(),
  expectedAt: new Date().toISOString(),
  closedAt: undefined,
  expectedTime: '1시간',
  priority: '높음',
  comment: [],
};

export const selectedNodeState = atom<INode | null>({
  key: 'selectedNode',
  default: sampleNode,
});
