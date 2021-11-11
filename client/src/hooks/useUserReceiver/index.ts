export interface IUserRes {
  type: string;
  userId: string;
}

export interface IUserReceiver {
  (props: IUserRes): void;
}

const useUserReceiver = () => {
  const useUserReceiver = ({ type, userId }: IUserRes) => {
    switch (type) {
      case 'JOIN':
        break;
      case 'LEFT':
        break;
      default:
        break;
    }
  };

  return useUserReceiver;
};
export default useUserReceiver;
