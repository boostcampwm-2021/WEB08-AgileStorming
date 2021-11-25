import { Title, UserIcon, Wrapper } from 'components/atoms';
import { IUser } from 'types/user';

interface IProps {
  user: IUser;
  color?: 'white' | 'black';
  width?: string;
}

const Profile: React.FC<IProps> = ({ user, color = 'white', width }) => {
  return (
    <Wrapper flex={'rowCenter'}>
      <UserIcon user={user} />
      <Title titleStyle='xlarge' color={color} margin='3px 0 3px 10px' width={width}>
        {user.name}
      </Title>
    </Wrapper>
  );
};

export default Profile;
