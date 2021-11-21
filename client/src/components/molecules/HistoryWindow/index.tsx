import { Wrapper, IconWrapper } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { IconButton } from '..';
import { MouseEvent } from 'react';
import useDragBackground from 'hooks/useDragBackground';
import { useRecoilValue } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import { userListState } from 'recoil/project';
import { primaryPlusCircle } from 'img';
import useNewHistoryData from 'hooks/useNewHistoryData';

interface IProps {
  onClick: (idx: number) => (event: MouseEvent) => void;
}

const HistoryWindow: React.FC<IProps> = ({ onClick }) => {
  const { containerRef, dragRef } = useDragBackground();
  const { getNewHistoryData } = useNewHistoryData();
  const historyDataList = useRecoilValue(historyDataListState);
  const userList = useRecoilValue(userListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const isSelected = (idx: number): boolean => idx === currentReverseIdx;

  const getMoreHistoryData = () => {
    const currentHistoryData = historyDataList.at(0);
    const rangeFrom = '(' + currentHistoryData?.streamId;

    getNewHistoryData(rangeFrom);
  };

  return (
    <Wrapper ref={containerRef} className='background'>
      <IconButton imgSrc={primaryPlusCircle} onClick={getMoreHistoryData} altText={'히스토리 목록 더 가져오기'} margin='0 0 0 1rem' />
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
