import { Wrapper, IconWrapper } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { MouseEvent } from 'react';
import useDragBackground from 'hooks/useDragBackground';
import { IHistoryData } from 'types/history';
import { useRecoilValue } from 'recoil';
import { historyDataState } from 'recoil/history';
import { userListState } from 'recoil/project';
import { getUser } from 'utils/helpers';

interface IProps {
  onClick: (historyData: IHistoryData, idx: number) => (event: MouseEvent) => void;
}

const HistoryWindow: React.FC<IProps> = ({ onClick }) => {
  const { containerRef, dragRef } = useDragBackground();
  const historyData = useRecoilValue(historyDataState);
  const userList = useRecoilValue(userListState);

  return (
    <Wrapper ref={containerRef} className='background'>
      {historyData && userList
        ? historyData.map((historyDataPiece, idx) => (
            <IconWrapper key={idx} onClick={onClick(historyDataPiece, idx)}>
              <UserIcon user={getUser(historyDataPiece.user, userList)!} cursor='pointer' />
            </IconWrapper>
          ))
        : null}
      <DragTarget ref={dragRef} />
    </Wrapper>
  );
};

export default HistoryWindow;
