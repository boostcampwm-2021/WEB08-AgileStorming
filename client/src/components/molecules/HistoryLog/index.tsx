import { Title } from 'components/atoms';
import { useRecoilValue } from 'recoil';
import { userListState } from 'recoil/project';
import { IHistoryData } from 'types/history';
import { Profile } from '..';
import { Wrapper } from './style';

interface IProps {
  history: IHistoryData | null;
}

const HistoryLog: React.FC<IProps> = ({ history }) => {
  const userList = useRecoilValue(userListState);

  return (
    <Wrapper>
      {history && userList ? (
        <>
          <Profile user={userList[history.user]} />
          <Title titleStyle='large' color='white' margin='0 0 0 1rem' lineHeight={2.5}>
            {history.type}
          </Title>
        </>
      ) : null}
    </Wrapper>
  );
};

export default HistoryLog;
