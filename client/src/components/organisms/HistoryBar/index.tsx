import { whiteCloseBtn } from 'img';
import useLinkClick from 'hooks/useLinkClick';
import { Wrapper, UpperDiv } from './style';
import { Title } from 'components/atoms';
import { HistoryLog, IconButton, PlayController, HistoryWindow } from 'components/molecules';
import { useCallback, useRef } from 'react';
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
  const { historyController } = useHistoryController();

  const isCalculating = useRef(false);

  const handleCloseHistoryBtnClick = () => {
    resetHistoryDataList();
    resetHistoryMapData();
    resetCurrentReverseIdx();
    linkToMindmap();
  };

  const handleHistoryClick = useCallback(
    (idx: number) => async () => {
      if (currentReverseIdx === idx || isCalculating.current) return;

      isCalculating.current = true;
      const controller = historyController({ fromIdx: currentReverseIdx, toIdx: idx });

      controller.finally(() => (isCalculating.current = false));
    },
    [currentReverseIdx, historyController]
  );

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
