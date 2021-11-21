import styled from '@emotion/styled';
import useHistoryController from 'hooks/useHistoryController';
import { backwardBtn, playBtn, forwardBtn } from 'img';
import { useRecoilValue } from 'recoil';
import { currentReverseIdxState } from 'recoil/history';
import { IconButton } from '..';

const PlayController = () => {
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const { getOldestHistory, getYoungestHistory } = useHistoryController();

  const handleBackwardBtnClick = () => getOldestHistory(currentReverseIdx);
  const handlePlayBtnClick = () => {};
  const handleForwardBtnClick = () => getYoungestHistory(currentReverseIdx);

  return (
    <Wrapper>
      <IconButton onClick={handleBackwardBtnClick} imgSrc={backwardBtn} altText='처음으로 이동하기 버튼' />
      <IconButton onClick={handlePlayBtnClick} imgSrc={playBtn} altText='재생하기 버튼' />
      <IconButton onClick={handleForwardBtnClick} imgSrc={forwardBtn} altText='끝으로 이동하기 버튼' />
    </Wrapper>
  );
};

export default PlayController;

const Wrapper = styled.div`
  ${({ theme }) => theme.flex.row}
`;
