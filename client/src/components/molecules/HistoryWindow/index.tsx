import { Wrapper, IconWrapper, After, Before } from './style';
import { DragTarget, UserIcon } from 'components/atoms';
import { IconButton } from '..';
import { MouseEvent, useEffect } from 'react';
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
  const { containerRef, dragRef } = useDragBackground({ startPosition: 'end' });
  const { getMoreHistoryData } = useNewHistoryData();
  const historyDataList = useRecoilValue(historyDataListState);
  const userList = useRecoilValue(userListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const isSelected = (idx: number): boolean => idx === currentReverseIdx;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    container.scrollBy({ left: container.scrollWidth / 2 });
  }, [historyDataList]);

  return (
    <Wrapper ref={containerRef} className='background'>
      <Before exist={historyDataList.length ? true : false} />
      <IconButton imgSrc={primaryPlusCircle} onClick={getMoreHistoryData} altText={'히스토리 목록 더 가져오기'} margin='0 0 0 1rem' />
      {historyDataList.length && userList
        ? historyDataList.map((historyData, idx) => (
            <IconWrapper
              key={historyData.historyId}
              onClick={onClick(idx - historyDataList.length)}
              isSelected={isSelected(idx - historyDataList.length)}
              color={userList[historyData.user].color}
              className={'background'}
            >
              <UserIcon user={userList[historyData.user]} cursor='pointer' />
            </IconWrapper>
          ))
        : null}
      <After />
      <DragTarget ref={dragRef} />
    </Wrapper>
  );
};

export default HistoryWindow;
