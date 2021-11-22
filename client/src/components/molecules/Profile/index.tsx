import { Title, UserIcon } from 'components/atoms';
import { IUser } from 'types/user';
import { Wrapper } from './style';

interface IProps {
  user: IUser;
}

const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <Wrapper>
      <UserIcon user={user} />
      <Title titleStyle='xlarge' color='white' margin='3px 0 3px 10px'>
        {user.name}
      </Title>
    </Wrapper>
  );
};

export default Profile;
