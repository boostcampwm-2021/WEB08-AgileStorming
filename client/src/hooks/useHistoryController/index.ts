import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';
import { IHistoryData } from 'types/history';
import { restoreHistory } from 'utils/historyHandler';

interface IHistoryControllerProps {
  fromIdx: number;
  toIdx: number;
}

const useHistoryController = () => {
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const [historyDataList, setHistoryDataList] = useRecoilState(historyDataListState);
  const setCurrentReverseIdx = useSetRecoilState(currentReverseIdxState);

  const handleMoveForward = (historyData: IHistoryData, idx: number, fromIdx: number) => {
    const params = { historyData, isForward: true, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
    restoreHistory(params);
    setCurrentReverseIdx(fromIdx + idx);
  };

  const handleMoveBackward = (historyData: IHistoryData, idx: number, fromIdx: number) => {
    const params = { historyData, isForward: false, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
    restoreHistory(params);

    setCurrentReverseIdx(fromIdx - idx);
  };

  const historyController = ({ fromIdx, toIdx }: IHistoryControllerProps) => {
    const isForward = fromIdx < toIdx;

    if (isForward) {
      const from = fromIdx + 1;
      const to = toIdx + 1 !== 0 ? toIdx + 1 : undefined;

      const stopHistories = historyDataList.slice(from, to);

      stopHistories.forEach((historyData, idx) => handleMoveForward(historyData, idx, fromIdx + 1));
    } else {
      const from = toIdx + 1;
      const to = fromIdx + 1 !== 0 ? fromIdx + 1 : undefined;

      const stopHistories = historyDataList.slice(from, to);
      stopHistories.reverse();

      stopHistories.forEach((historyData, idx) => handleMoveBackward(historyData, idx, fromIdx - 1));
    }
  };

  return historyController;
};

export default useHistoryController;
