import { Title } from 'components/atoms';
import { useRecoilValue } from 'recoil';
import { userListState } from 'recoil/project';
import { IHistoryData } from 'types/history';
import { Profile } from '..';
import { Wrapper } from './style';

interface IProps {
  historyData: IHistoryData | null;
}

const HistoryLog: React.FC<IProps> = ({ historyData }) => {
  const userList = useRecoilValue(userListState);

  return (
    <Wrapper>
      {historyData && userList ? (
        <>
          <Profile user={userList[historyData.user]} />
          <Title titleStyle='large' color='white' margin='0 0 0 1rem' lineHeight={2.5}>
            {historyData.type}
          </Title>
        </>
      ) : null}
    </Wrapper>
  );
};

export default HistoryLog;
