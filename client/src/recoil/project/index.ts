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

const filteredTaskState = selector<IMindNode[]>({
  key: 'filteredTask',
  get: ({ get }) => {
    const nodes = get(mindmapNodesState);
    const assigneeFilter = get(assigneeFilterState);
    const sprintFilter = get(sprintFilterState);
    const labelFilter = get(labelFilterState);
    const filteredTask: IMindNode[] = Array.from(nodes.values()).filter((node) => {
      if (node.level !== 'TASK') {
        return false;
      }
      if (assigneeFilter && node.assigneeId !== assigneeFilter) {
        return false;
      }
      if (sprintFilter && node.sprintId !== sprintFilter) {
        return false;
      }
      if (labelFilter && node.labelIds && !JSON.parse(node.labelIds).includes(labelFilter)) {
        return;
      }
      return true;
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

export {
  projectIdState,
  sprintListState,
  userListState,
  connectedUserState,
  labelListState,
  assigneeFilterState,
  sprintFilterState,
  labelFilterState,
  filteredTaskState,
  filteredTaskTimeState,
};
