import { IconImg, Title } from 'components/atoms';
import { IUser } from 'recoil/user';

interface IProps {
  user: IUser;
}

const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <>
      <IconImg imgSrc={user.icon} altText={user.name} />
      <Title titleStyle='xlarge' color='white'>
        {user.name}
      </Title>
    </>
  );
};

export default Profile;
