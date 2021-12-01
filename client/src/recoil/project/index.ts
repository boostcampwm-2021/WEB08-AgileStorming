import { atom, selector } from 'recoil';
import { mindmapNodesState } from 'recoil/mindmap';
import { userState } from 'recoil/user';
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

const userFocusNodeState = atom<Map<string, number>>({
  key: 'userFocusNode',
  default: new Map(),
});

const urlLocationState = atom<string>({
  key: 'urlLocationState',
  default: '/',
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
  key: 'filteredUserInProgressTask',
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

const userListCurrentUserTopState = selector<Array<IUser>>({
  key: 'userListCurrentUserOnTop',
  get: ({ get }) => {
    const userList = get(userListState);
    const user = get(userState);
    if (!user) {
      return Object.values(userList);
    }
    return [user, ...Object.values(userList).filter((users) => users.id !== user.id)];
  },
});

export interface SprintTaskInfo {
  sprintName: string;
  sprintStartDate: string;
  totalEstimatedTime: number;
  totalFinishedTime: number;
}

const sprintBurnDownState = selector<SprintTaskInfo[]>({
  key: 'sprintBurnDown',
  get: ({ get }) => {
    const sprintList = get(sprintListState);
    const taskInSprint: Record<number, SprintTaskInfo> = {};
    Object.values(sprintList).forEach((sprint) => {
      taskInSprint[sprint.id] = {
        sprintName: sprint.name,
        sprintStartDate: sprint.startDate,
        totalEstimatedTime: 0,
        totalFinishedTime: 0,
      };
    });
    const nodes = get(mindmapNodesState);
    nodes.forEach((node) => {
      if (node.sprintId) {
        const sprintInfo = taskInSprint[node.sprintId];
        const { totalEstimatedTime, totalFinishedTime } = sprintInfo;
        taskInSprint[node.sprintId] = {
          ...sprintInfo,
          totalEstimatedTime: totalEstimatedTime + Number(node.estimatedTime),
          totalFinishedTime: totalFinishedTime + Number(node.finishedTime),
        };
      }
    });
    return Object.values(taskInSprint).sort((a: SprintTaskInfo, b: SprintTaskInfo) => {
      if (a.sprintStartDate > b.sprintStartDate) return 1;
      if (a.sprintStartDate < b.sprintStartDate) return -1;
      if (a.sprintStartDate === b.sprintStartDate) return 0;
      return 0;
    });
  },
});

interface UserTaskInfo {
  userName: string;
  totalUserTaskEstimatedTime: number;
  tasks: Array<[string, number]>;
}

const userTaskRatioState = selector<UserTaskInfo[]>({
  key: 'userTaskRatio',
  get: ({ get }) => {
    const userList = get(userListState);
    const taskOnUser: Record<string, UserTaskInfo> = {};
    const nodes = get(mindmapNodesState);
    Object.values(userList).forEach((user) => {
      taskOnUser[user.id] = {
        userName: user.name,
        totalUserTaskEstimatedTime: 0,
        tasks: [],
      };
    });
    nodes.forEach((node) => {
      if (node.assigneeId) {
        const userInfo = taskOnUser[node.assigneeId];
        const { totalUserTaskEstimatedTime, tasks } = userInfo;
        tasks.push([node.content, Number(node.estimatedTime)]);
        taskOnUser[node.assigneeId] = {
          ...userInfo,
          totalUserTaskEstimatedTime: totalUserTaskEstimatedTime + Number(node.estimatedTime),
          tasks,
        };
      }
    });
    return Object.values(taskOnUser);
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
  userFocusNodeState,
  urlLocationState,
  filteredTaskState,
  filteredTaskTimeState,
  filteredUserInProgressTaskState,
  userListCurrentUserTopState,
  sprintBurnDownState,
  userTaskRatioState,
};
