import { Title, UserIcon, Wrapper } from 'components/atoms';
import { IUser } from 'types/user';

interface IProps {
  user: IUser;
  color?: 'white' | 'black';
}

const Profile: React.FC<IProps> = ({ user, color = 'white' }) => {
  return (
    <Wrapper flex={'rowCenter'}>
      <UserIcon user={user} />
      <Title titleStyle='xlarge' color={color} margin='3px 0 3px 10px'>
        {user.name}
      </Title>
    </Wrapper>
  );
};

export default Profile;
