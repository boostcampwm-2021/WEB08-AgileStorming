import { atom, selector } from 'recoil';
import { socketState } from 'recoil/socket';
import { IUser } from 'types/user';
import { project } from 'utils/api';

export const userListOpenState = atom<boolean>({
  key: 'userListOpen',
  default: false,
});

export const connectedUserState = atom<Record<string, boolean>>({
  key: 'connectedUser',
  default: {},
});

export const forceReloadUserList = atom<string>({
  key: 'reload',
  default: '',
});

export const queryUserListState = selector({
  key: 'queryUserList',
  get: async ({ get }) => {
    get(forceReloadUserList);
    const { projectId } = get(socketState);
    if (!projectId) return;
    try {
      const { data } = await project.getUserList(projectId);
      const userList: Record<string, IUser> = {};
      data.forEach((user: IUser) => {
        userList[user.id] = {
          ...user,
        };
      });
      return userList;
    } catch (e) {
      throw e;
    }
  },
});
