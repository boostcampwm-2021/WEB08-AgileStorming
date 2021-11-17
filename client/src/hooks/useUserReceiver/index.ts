import { useSetRecoilState } from 'recoil';
import useToast from 'hooks/useToast';
import { connectedUserState, userListState } from 'recoil/project';
import { IUser } from 'types/user';

type TUserReceiverType = 'JOIN' | 'LEFT' | 'NEW' | 'INIT';
export interface IUserRes {
  type: TUserReceiverType;
  data: string | string[];
}

export interface IUserReceiver {
  (props: IUserRes): void;
}

const useUserReceiver = () => {
  const setUserList = useSetRecoilState(userListState);
  const setConnectedUser = useSetRecoilState(connectedUserState);
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
        const newUser: IUser = JSON.parse(data as string);
        setUserList((prev) => [...prev, newUser]);
        showMessage(`${newUser.name} 님이 새로 참여하셨습니다.`);
        break;
      case 'INIT':
        const connectedUser: Record<string, boolean> = {};
        (data as string[]).forEach((userId: string) => (connectedUser[userId] = true));
        setConnectedUser(connectedUser);
        break;
      default:
        break;
    }
  };

  return userReceiver;
};
export default useUserReceiver;
