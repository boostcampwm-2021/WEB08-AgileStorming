import { Title } from 'components/atoms';
import { IHistoryData } from 'types/history';
import { Profile } from '..';
import { Wrapper } from './style';

interface IProps {
  history: IHistoryData | null;
}

const HistoryLog: React.FC<IProps> = ({ history }) => {
  return (
    <Wrapper>
      {history ? (
        <>
          <Profile user={history.user} />
          <Title titleStyle='large' color='white' margin='0 0 0 1rem' lineHeight={2.5}>
            {history.type}
          </Title>
        </>
      ) : null}
    </Wrapper>
  );
};

export default HistoryLog;
