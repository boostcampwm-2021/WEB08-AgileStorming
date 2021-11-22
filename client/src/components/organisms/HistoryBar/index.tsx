import { Wrapper } from './style';
import { HistoryLog, HistoryWindow } from 'components/molecules';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentReverseIdxState, historyDataListState, isHistoryCalculatingState } from 'recoil/history';
import useHistoryController from 'hooks/useHistoryController';
import { HistoryHeader } from '..';

const HistoryBar: React.FC = () => {
  const historyDataList = useRecoilValue(historyDataListState);
  const currentReverseIdx = useRecoilValue(currentReverseIdxState);

  const { historyController } = useHistoryController();

  const [isCalculating, setIsCalculating] = useRecoilState(isHistoryCalculatingState);

  const handleHistoryClick = useCallback(
    (idx: number) => async () => {
      if (currentReverseIdx === idx || isCalculating) return;

      setIsCalculating(true);
      const controller = historyController({ fromIdx: currentReverseIdx, toIdx: idx });

      controller.finally(() => {
        setIsCalculating(false);
      });
    },
    [currentReverseIdx, historyController, isCalculating]
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
