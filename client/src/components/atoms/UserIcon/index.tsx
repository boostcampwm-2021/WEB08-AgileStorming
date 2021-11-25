import { StyledIcon } from './style';
import { IUser, TIcon } from 'types/user';

interface IProps {
  user: IUser;
  cursor?: string;
  adaptive?: boolean;
}

const iconToEmoji: { [key in TIcon]: string } = {
  frog: '🐸',
  panda: '🐼',
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
};

const UserIcon: React.FC<IProps> = ({ user, cursor, adaptive = false }) => {
  return (
    <StyledIcon color={user.color} cursor={cursor} adaptive={adaptive}>
      {iconToEmoji[user.icon]}
    </StyledIcon>
  );
};

export default UserIcon;
