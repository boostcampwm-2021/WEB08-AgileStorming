import styled from '@emotion/styled';
import { Title } from 'components/atoms';
import { IUser } from 'types/user';

interface IProps {
  user: IUser;
}

const IconP = styled.p`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <>
      {/* <img src={user.icon} alt={user.name} /> */}
      <IconP>🐷</IconP>
      <Title titleStyle='xlarge' color='white'>
        {user.name}
      </Title>
    </>
  );
};

export default Profile;
