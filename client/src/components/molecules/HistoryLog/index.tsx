import styled from '@emotion/styled';
import { IconImg, Title } from 'components/atoms';
import { IUser } from 'recoil/user';

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row};
  gap: 0.5rem;
  width: 100%;
`;

interface IPros {
  modifier: IUser;
  log: string;
}

const HistoryLog: React.FC<IPros> = ({ modifier, log }) => {
  return (
    <Wrapper>
      <IconImg imgSrc={modifier.icon} altText={modifier.name} />
      <Title titleStyle='xlarge' color='white'>
        {modifier.name}
      </Title>
      <Title titleStyle='large' color='white'>
        {log}
      </Title>
    </Wrapper>
  );
};

export default HistoryLog;
