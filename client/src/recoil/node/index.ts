import { IUser } from 'recoil/user';
import { Levels } from 'utils/helpers';
import { atom } from 'recoil';

export interface INode {
  nodeId: number;
  backlogId: string;
  level: Levels;
  content: string;
  children: Array<number>;
  label: number[];
  sprint: number | null;
  assignee: IUser | null;
  createdAt: string;
  expectedAt: string | null;
  closedAt: Date | null;
  expectedTime: 1 | null;
  priority: 1 | null;
  comment: [];
}

const sampleNode: INode = {
  nodeId: 1,
  backlogId: '1-2-1',
  level: 'STORY',
  content: '화살표 클릭으로 월별로 달력을 이동할 수 있다.',
  children: [10, 11],
  label: [1, 2],
  sprint: null,
  assignee: { id: 1, name: '조성현', color: '000000', icon: 'chicken' }, // id로 프로젝트 전체 멤버랑 join
  createdAt: new Date().toISOString(),
  expectedAt: new Date().toISOString(),
  closedAt: null,
  expectedTime: 1,
  priority: 1,
  comment: [],
};

export const selectedNodeState = atom<INode | null>({
  key: 'selectedNode',
  default: sampleNode,
});
