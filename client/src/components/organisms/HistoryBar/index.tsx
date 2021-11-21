import { Wrapper } from './style';
import { HistoryLog, HistoryWindow } from 'components/molecules';
import { useCallback, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import useHistoryController from 'hooks/useHistoryController';
import { HistoryHeader } from '..';

const HistoryBar: React.FC = () => {
  const historyDataList = useRecoilValue(historyDataListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);

  const { historyController } = useHistoryController();

  const isCalculating = useRef(false);

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
      <HistoryHeader />
      <HistoryWindow onClick={handleHistoryClick} />
      <HistoryLog historyData={historyDataList.at(currentReverseIdx) ?? null} />
    </Wrapper>
  );
};

export default HistoryBar;
