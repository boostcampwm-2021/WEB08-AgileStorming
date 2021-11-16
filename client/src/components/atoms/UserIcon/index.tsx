import { StyledIcon } from './style';
import { IUser, TIcon } from 'types/user';

interface IProps {
  user: IUser;
  cursor?: string;
}

const iconToEmoji: { [key in TIcon]: string } = {
  frog: '🐸',
  panda: '🐼',
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
};

const UserIcon: React.FC<IProps> = ({ user, cursor }) => {
  return (
    <StyledIcon color={user.color} cursor={cursor}>
      {iconToEmoji[user.icon]}
    </StyledIcon>
  );
};

export default UserIcon;
