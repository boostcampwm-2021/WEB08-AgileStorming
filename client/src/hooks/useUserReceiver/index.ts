import { useSetRecoilState } from 'recoil';
import { connectedUserState, forceReloadUserList } from 'recoil/user-list';
import useToast from 'hooks/useToast';

type TUserReceiverType = 'JOIN' | 'LEFT' | 'NEW' | 'INIT';
export interface IUserRes {
  type: TUserReceiverType;
  data: string | string[];
}

export interface IUserReceiver {
  (props: IUserRes): void;
}

const useUserReceiver = () => {
  const setConnectedUser = useSetRecoilState(connectedUserState);
  const forceUserListReload = useSetRecoilState(forceReloadUserList);
  const { showMessage } = useToast();
  const userReceiver = ({ type, data }: IUserRes) => {
    switch (type) {
      case 'JOIN':
        setConnectedUser((users) => {
          const newUsers = { ...users };
          newUsers[data as string] = true;
          return { ...newUsers };
        });
        break;
      case 'LEFT':
        setConnectedUser((users) => {
          const newUsers = { ...users };
          delete newUsers[data as string];
          return { ...newUsers };
        });
        break;
      case 'NEW':
        showMessage(`${data} 님이 새로 참여하셨습니다.`);
        forceUserListReload(new Date().toISOString());
        break;
      case 'INIT':
        const connectedUser: Record<string, boolean> = {};
        (data as string[]).forEach((userId: string) => {
          connectedUser[userId] = true;
        });
        setConnectedUser(connectedUser);
        break;
      default:
        break;
    }
  };

  return userReceiver;
};
export default useUserReceiver;
