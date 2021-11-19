import { Wrapper, IconWrapper } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { MouseEvent } from 'react';
import useDragBackground from 'hooks/useDragBackground';
import { IHistoryData } from 'types/history';
import { useRecoilValue } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { userListState } from 'recoil/project';

interface IProps {
  onClick: (historyData: IHistoryData, idx: number) => (event: MouseEvent) => void;
  currentHistoryData: IHistoryData | null;
}

const HistoryWindow: React.FC<IProps> = ({ onClick, currentHistoryData }) => {
  const { containerRef, dragRef } = useDragBackground();
  const historyDataList = useRecoilValue(historyDataListState);
  const userList = useRecoilValue(userListState);
  const isSelected = (data: IHistoryData): boolean => currentHistoryData !== null && data.historyId === currentHistoryData.historyId;

  return (
    <Wrapper ref={containerRef} className='background'>
      {historyDataList.length && userList && currentHistoryData
        ? historyDataList.map((historyData, idx) => (
            <IconWrapper
              key={historyData.historyId}
              onClick={onClick(historyData, idx)}
              isSelected={isSelected(historyData)}
              color={userList[historyData.user].color}
            >
              <UserIcon user={userList[historyData.user]} cursor='pointer' />
            </IconWrapper>
          ))
        : null}
      <DragTarget ref={dragRef} />
    </Wrapper>
  );
};

export default HistoryWindow;
