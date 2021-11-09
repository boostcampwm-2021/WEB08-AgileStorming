import styled from '@emotion/styled';
import { Title } from 'components/atoms';
import { IUser } from 'recoil/user';
import { Profile } from '..';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row};
  width: 100%;
`;

interface IPros {
  modifier: IUser;
  log: string;
}

const HistoryLog: React.FC<IPros> = ({ modifier, log }) => {
  return (
    <Wrapper>
      <Profile user={modifier} />
      <Title titleStyle='xlarge' color='white' margin='0 0 0 0.5rem' lineHeight={2}>
        {log}
      </Title>
    </Wrapper>
  );
};

export default HistoryLog;
