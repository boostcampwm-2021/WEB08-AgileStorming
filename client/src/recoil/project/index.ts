import { atom, selector } from 'recoil';
import { ILabel } from 'types/label';
import { ISprint } from 'types/sprint';
import { IUser } from 'types/user';
import { project } from 'utils/api';

export const projectIdState = atom<string | null>({
  key: 'projectIdAtom',
  default: null,
});

export const projectInfoState = selector({
  key: 'projectInfo',
  get: async ({ get }) => {
    const projectId = get(projectIdState);
    if (!projectId) return null;

    const projectInfo = await project.getInfo(projectId);
    return projectInfo;
  },
});

export const sprintListState = selector<ISprint[]>({
  key: 'sprintList',
  get: ({ get }) => {
    const projectInfo = get(projectInfoState);
    if (!projectInfo) return [];
    return projectInfo.sprints;
  },
});

export const userListState = selector<IUser[]>({
  key: 'userList',
  get: ({ get }) => {
    const projectInfo = get(projectInfoState);
    if (!projectInfo) return [];
    return projectInfo.users;
  },
});

export const labelListState = selector<ILabel[]>({
  key: 'labelList',
  get: ({ get }) => {
    const projectInfo = get(projectInfoState);
    if (!projectInfo) return [];
    return projectInfo.labels;
  },
});
