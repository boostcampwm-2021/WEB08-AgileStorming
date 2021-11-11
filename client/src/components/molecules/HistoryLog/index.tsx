import styled from '@emotion/styled';
import { Title } from 'components/atoms';
import { IUser } from 'recoil/user';
import { Profile } from '..';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row};
  width: 100%;
`;

export interface IDescription {
  modifier: IUser;
  type: 'ADD_NODE' | 'DELETE_NODE' | 'UPDATE_NODE_POSITION' | 'UPDATE_NODE_CONTENT';
  content: string;
}

interface IProps {
  description: IDescription | null;
}

const HistoryLog: React.FC<IProps> = ({ description }) => {
  return (
    <Wrapper>
      {description ? (
        <>
          <Profile user={description.modifier} />
          <Title titleStyle='xlarge' color='white' margin='0 0 0 0.5rem' lineHeight={2}>
            {description.type}
          </Title>
        </>
      ) : null}
    </Wrapper>
  );
};

export default HistoryLog;
