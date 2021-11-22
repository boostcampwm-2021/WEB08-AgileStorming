import { atom, selector } from 'recoil';
import { mindmapNodesState } from 'recoil/mindmap';
import { ILabel } from 'types/label';
import { IMindNode } from 'types/mindmap';
import { ISprint } from 'types/sprint';
import { IUser } from 'types/user';

const projectIdState = atom<string | null>({
  key: 'projectIdAtom',
  default: null,
});

const sprintListState = atom<Record<number, ISprint>>({
  key: 'sprintList',
  default: {},
});

const userListState = atom<Record<string, IUser>>({
  key: 'userList',
  default: {},
});

const connectedUserState = atom<Record<string, boolean>>({
  key: 'connectedUser',
  default: {},
});

const labelListState = atom<Record<number, ILabel>>({
  key: 'labelList',
  default: {},
});

const assigneeFilterState = atom<string | null>({
  key: 'assigneeFilter',
  default: null,
});

const sprintFilterState = atom<number | null>({
  key: 'sprintFilter',
  default: null,
});

const labelFilterState = atom<number | null>({
  key: 'labelFilter',
  default: null,
});

const userMouseOverState = atom<string>({
  key: 'userMouseOver',
  default: '',
});

const filteredTaskState = selector<Record<number, IMindNode>>({
  key: 'filteredTask',
  get: ({ get }) => {
    const nodes = get(mindmapNodesState);
    const assigneeFilter = get(assigneeFilterState);
    const sprintFilter = get(sprintFilterState);
    const labelFilter = get(labelFilterState);
    const filteredTask: Record<number, IMindNode> = {};

    nodes.forEach((node) => {
      if (node.level !== 'TASK') {
        return;
      }
      if (assigneeFilter && node.assigneeId !== assigneeFilter) {
        return;
      }
      if (sprintFilter && node.sprintId !== sprintFilter) {
        return;
      }
      if (labelFilter && !node.labelIds) {
        return;
      }
      if (labelFilter && node.labelIds && !JSON.parse(node.labelIds).includes(labelFilter)) {
        return;
      }
      filteredTask[node.nodeId] = node;
    });

    return filteredTask;
  },
});

const filteredTaskTimeState = selector<{ totalEstimatedTime: number; totalUsedTime: number }>({
  key: 'filteredTaskEstimatedTime',
  get: ({ get }) => {
    const filteredNodes = get(filteredTaskState);
    let totalEstimatedTime = 0;
    let totalUsedTime = 0;

    Object.values(filteredNodes).forEach((task) => {
      totalEstimatedTime += Number(task.estimatedTime);
      totalUsedTime += Number(task.finishedTime);
    });

    return { totalEstimatedTime, totalUsedTime };
  },
});

const filteredUserInProgressTaskState = selector<IMindNode[]>({
  key: 'filteredUserInProgressTaskState',
  get: ({ get }) => {
    const nodes = get(mindmapNodesState);
    const mouseOverUser = get(userMouseOverState);
    return Array.from(nodes.values()).filter((node) => {
      if (node.level !== 'TASK') {
        return false;
      }
      if (node.assigneeId !== mouseOverUser) {
        return false;
      }
      if (node.status !== 'In Progress') {
        return false;
      }
      return true;
    });
  },
});

export {
  projectIdState,
  sprintListState,
  userListState,
  connectedUserState,
  labelListState,
  assigneeFilterState,
  sprintFilterState,
  labelFilterState,
  userMouseOverState,
  filteredTaskState,
  filteredTaskTimeState,
  filteredUserInProgressTaskState,
};
