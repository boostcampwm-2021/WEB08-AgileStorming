import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentReverseIdxState, historyDataListState } from 'recoil/history';
import { historyMapDataState } from 'recoil/mindmap';
import { IHistoryData } from 'types/history';
import { restoreHistory } from 'utils/historyHandler';

interface IHistoryControllerProps {
  fromIdx: number;
  toIdx: number;
}

interface IHandleMoveProps {
  historyData: IHistoryData;
  idx: number;
  fromIdx: number;
}

const useHistoryController = () => {
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const [historyDataList, setHistoryDataList] = useRecoilState(historyDataListState);
  const setCurrentReverseIdx = useSetRecoilState(currentReverseIdxState);

  const handleMoveForward = ({ historyData, idx, fromIdx }: IHandleMoveProps) => {
    const params = { historyData, isForward: true, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
    restoreHistory(params);
    setCurrentReverseIdx(fromIdx + idx);
  };

  const handleMoveBackward = ({ historyData, idx, fromIdx }: IHandleMoveProps) => {
    const params = { historyData, isForward: false, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
    restoreHistory(params);

    setCurrentReverseIdx(fromIdx - idx);
  };

  const wait = (time: number, func: (props: IHandleMoveProps) => void, props: IHandleMoveProps) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(func(props)), time);
    });

  const getFromTo = (fromIdx: number, toIdx: number, isForward: boolean) => {
    const [forwardIdx, backwardIdx] = isForward ? [fromIdx, toIdx] : [toIdx, fromIdx];
    return [forwardIdx + 1, backwardIdx + 1 !== 0 ? backwardIdx + 1 : undefined];
  };

  const restoreAsyncHistory = (stopHistories: IHistoryData[], directionFunc: (props: IHandleMoveProps) => void, fromIdx: number) => {
    stopHistories.reduce(async (lastPromise, historyData, idx) => {
      await lastPromise;
      await wait(700, directionFunc, { historyData, idx, fromIdx: fromIdx });
    }, Promise.resolve());
  };

  const historyController = ({ fromIdx, toIdx }: IHistoryControllerProps) => {
    const isForward = fromIdx < toIdx;
    const [from, to] = getFromTo(fromIdx, toIdx, isForward);
    const stopHistories = historyDataList.slice(from, to);

    if (isForward) {
      restoreAsyncHistory(stopHistories, handleMoveForward, fromIdx + 1);
    } else {
      stopHistories.reverse();
      restoreAsyncHistory(stopHistories, handleMoveBackward, fromIdx - 1);
    }
  };

  return historyController;
};

export default useHistoryController;
