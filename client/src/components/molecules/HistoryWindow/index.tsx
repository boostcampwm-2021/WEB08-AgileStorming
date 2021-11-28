import { Wrapper, IconWrapper, After, Before } from './style';
import { UserIcon } from 'components/atoms';
import { IconButton } from '..';
import { MouseEvent, useEffect, useRef } from 'react';
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
  const dragRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<HTMLDivElement[]>([]);
  const { getMoreHistoryData } = useNewHistoryData();
  const historyDataList = useRecoilValue(historyDataListState);
  const userList = useRecoilValue(userListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const isSelected = (idx: number): boolean => idx === currentReverseIdx;

  useDragBackground(dragRef.current);

  useEffect(() => {
    if (currentReverseIdx !== -1) return;
    const lastHistory = refs.current.at(-1);
    if (lastHistory) lastHistory.scrollIntoView({ block: 'center', inline: 'center' });
  }, [historyDataList]);

  const addToRefs = (el: HTMLDivElement) => refs.current.push(el);

  useEffect(() => {
    if (refs.current.length === 0) return;
    const target = refs.current.at(currentReverseIdx);
    target!.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }, [currentReverseIdx]);

  return (
    <Wrapper ref={dragRef} className='background'>
      <Before exist={historyDataList.length ? true : false} />
      <IconButton imgSrc={primaryPlusCircle} onClick={getMoreHistoryData} altText={'히스토리 목록 더 가져오기'} margin='0 0 0 1rem' />
      {historyDataList.length && userList
        ? historyDataList.map((historyData, idx) => (
            <IconWrapper
              ref={addToRefs}
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
    </Wrapper>
  );
};

export default HistoryWindow;
