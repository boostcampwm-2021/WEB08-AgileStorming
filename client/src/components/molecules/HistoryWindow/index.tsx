import { Wrapper, IconWrapper } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { MouseEvent } from 'react';
import useDragBackground from 'hooks/useDragBackground';
import { useRecoilValue } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import { userListState } from 'recoil/project';

interface IProps {
  onClick: (idx: number) => (event: MouseEvent) => void;
}

const HistoryWindow: React.FC<IProps> = ({ onClick }) => {
  const { containerRef, dragRef } = useDragBackground();
  const historyDataList = useRecoilValue(historyDataListState);
  const userList = useRecoilValue(userListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const isSelected = (idx: number): boolean => idx === currentReverseIdx;

  return (
    <Wrapper ref={containerRef} className='background'>
      {historyDataList.length && userList
        ? historyDataList.map((historyData, idx) => (
            <IconWrapper
              key={historyData.historyId}
              onClick={onClick(idx - historyDataList.length)}
              isSelected={isSelected(idx - historyDataList.length)}
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
