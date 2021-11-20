import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useCallback, useEffect, useState } from 'react';
import { IHistoryData } from 'types/history';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';
import useHistoryController from 'hooks/useHistoryController';

const HistoryBar: React.FC = () => {
  const historyDataList = useRecoilValue(historyDataListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);

  const resetHistoryDataList = useResetRecoilState(historyDataListState);
  const resetHistoryMapData = useResetRecoilState(historyMapDataState);
  const resetCurrentReverseIdx = useResetRecoilState(currentReverseIdxState);

  const linkToMindmap = useLinkClick('mindmap');
  const historyController = useHistoryController();

  const handleCloseHistoryBtnClick = () => {
    resetHistoryDataList();
    resetHistoryMapData();
    resetCurrentReverseIdx();
    linkToMindmap();
  };

  const handleHistoryClick = useCallback(
    (idx: number) => () => {
      if (!currentReverseIdx) return handleCloseHistoryBtnClick();
      if (currentReverseIdx === idx) return;

      const isForward = currentReverseIdx < idx;

      historyController({ from: currentReverseIdx, to: idx, isForward });
    },
    [currentReverseIdx]
  );

  // useEffect(() => {
  //   if (!historyDataList.length || currentReverseIdx) return;
  //   setcurrentReverseIdx(-1);
  // }, [historyDataList]);

  return (
    <Wrapper>
      <UpperDiv>
        <Title titleStyle='xxxlarge' color='white'>
          History
        </Title>
        <PlayController />
        <IconButton imgSrc={whiteCloseBtn} onClick={handleCloseHistoryBtnClick} altText='히스토리 닫기 버튼'></IconButton>
      </UpperDiv>
      <HistoryWindow onClick={handleHistoryClick} />
      <HistoryLog historyData={historyDataList.at(currentReverseIdx) ?? null} />
    </Wrapper>
  );
};

export default HistoryBar;
