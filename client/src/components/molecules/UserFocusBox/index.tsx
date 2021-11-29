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
  width: 100%;
  position: absolute;
  left: -1rem;
  top: 0;
  transform: translateY(-70%);
`;

const UserFocusTag = styled(NodeTag)<IFocusProps>`
  width: 33%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
