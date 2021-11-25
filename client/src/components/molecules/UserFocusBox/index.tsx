import styled from '@emotion/styled';
import { NodeTag } from 'components/atoms';
import { IUser } from 'types/user';

interface IProps {
  users: Array<IUser>;
}
interface IFocusProps {
  userColor: string;
}

const Container = styled.div`
  ${({ theme }) => theme.flex.row};
  position: absolute;
  left: -10%;
  top: 0;
  transform: translateY(-50%);
`;

const UserFocusTag = styled(NodeTag)<IFocusProps>`
  background: ${({ userColor }) => '#' + userColor};
`;

const UserFocusBox: React.FC<IProps> = ({ users }) => {
  return (
    <>
      <Container>
        {users.map(({ id, color, name }) => (
          <UserFocusTag key={id} userColor={color}>
            {name}
          </UserFocusTag>
        ))}
      </Container>
    </>
  );
};

export default UserFocusBox;
