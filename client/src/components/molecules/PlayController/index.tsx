import useHistoryController from 'hooks/useHistoryController';
import { backwardBtn, playBtn, forwardBtn, pauseBtn } from 'img';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentReverseIdxState, isHistoryCalculatingState } from 'recoil/history';
import { IconButton } from '..';
import { Wrapper } from './style';

const PlayController = () => {
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);
  const { getOldestHistory, getYoungestHistory, playHistories, stopHistories } = useHistoryController();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCalculating, setIsCalculating] = useRecoilState(isHistoryCalculatingState);

  const handleBackwardBtnClick = useCallback(() => {
    if (isCalculating) return;
    getOldestHistory(currentReverseIdx);
  }, [isCalculating]);

  const handleForwardBtnClick = useCallback(() => {
    if (isCalculating) return;
    getYoungestHistory(currentReverseIdx);
  }, [isCalculating]);

  const handlePlayBtnClick = useCallback(() => {
    if (isCalculating) return;
    setIsCalculating(true);
    playHistories(currentReverseIdx);
    setIsPlaying(true);
  }, [isCalculating, currentReverseIdx]);

  const handleStopBtnClick = () => {
    setIsCalculating(false);
    stopHistories();
    setIsPlaying(false);
  };

  return (
    <Wrapper>
      <IconButton onClick={handleBackwardBtnClick} imgSrc={backwardBtn} altText='처음으로 이동하기 버튼' />
      {isPlaying ? (
        <IconButton onClick={handleStopBtnClick} imgSrc={pauseBtn} altText='정지 버튼' />
      ) : (
        <IconButton onClick={handlePlayBtnClick} imgSrc={playBtn} altText='재생하기 버튼' />
      )}
      <IconButton onClick={handleForwardBtnClick} imgSrc={forwardBtn} altText='끝으로 이동하기 버튼' />
    </Wrapper>
  );
};

export default PlayController;
