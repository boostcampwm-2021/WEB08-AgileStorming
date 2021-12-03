import { useRecoilValue } from 'recoil';
import { Profile } from '..';
import { Wrapper } from './style';
import { Title } from 'components/atoms';
import { useLog } from 'hooks/useLog';
import { userListState } from 'recoil/project';
import { IHistoryData } from 'types/history';

interface IProps {
  historyData: IHistoryData | null;
}

const HistoryLog: React.FC<IProps> = ({ historyData }) => {
  const userList = useRecoilValue(userListState);
  const getLog = useLog();

  return (
    <Wrapper>
      {historyData && userList ? (
        <>
          <Profile user={userList[historyData.user]} />
          <Title titleStyle='large' color='white' margin='0 0 0 1rem' lineHeight={2.3}>
            {getLog(historyData)}
          </Title>
        </>
      ) : null}
    </Wrapper>
  );
};

export default HistoryLog;
