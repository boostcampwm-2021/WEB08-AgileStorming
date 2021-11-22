import { useCallback, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentReverseIdxState, historyDataListState, historyMovingSpeedState, isHistoryCalculatingState } from 'recoil/history';
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

const wait = (time: number, func: (props: IHandleMoveProps) => void, props: IHandleMoveProps) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(func(props)), time);
  });

const getFromTo = (fromIdx: number, toIdx: number, isForward: boolean) => {
  const [forwardIdx, backwardIdx] = isForward ? [fromIdx, toIdx] : [toIdx, fromIdx];
  return [forwardIdx + 1, backwardIdx + 1 !== 0 ? backwardIdx + 1 : undefined];
};

const restoreAsyncHistory = (
  stopHistories: IHistoryData[],
  directionFunc: (props: IHandleMoveProps) => void,
  fromIdx: number,
  time: number
) => {
  const result = stopHistories.reduce(async (lastPromise, historyData, idx) => {
    await lastPromise;
    await wait(time, directionFunc, { historyData, idx, fromIdx: fromIdx });
  }, Promise.resolve());
  return result;
};

const useHistoryController = () => {
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const [historyDataList, setHistoryDataList] = useRecoilState(historyDataListState);
  const setCurrentReverseIdx = useSetRecoilState(currentReverseIdxState);
  const setIsCalculating = useSetRecoilState(isHistoryCalculatingState);
  const time = useRecoilValue(historyMovingSpeedState);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  const handleMoveForward = useCallback(
    ({ historyData, idx, fromIdx }: IHandleMoveProps) => {
      const params = { historyData, isForward: true, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
      restoreHistory(params);
      setCurrentReverseIdx(fromIdx + idx);
    },
    [historyDataList, historyMapData]
  );

  const handleMoveBackward = useCallback(
    ({ historyData, idx, fromIdx }: IHandleMoveProps) => {
      const params = { historyData, isForward: false, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
      restoreHistory(params);
      setCurrentReverseIdx(fromIdx - idx);
    },
    [historyDataList, historyMapData]
  );

  const historyController = useCallback(
    ({ fromIdx, toIdx }: IHistoryControllerProps) => {
      const isForward = fromIdx < toIdx;
      const [from, to] = getFromTo(fromIdx, toIdx, isForward);
      const stopHistories = historyDataList.slice(from, to);

      if (isForward) {
        return restoreAsyncHistory(stopHistories, handleMoveForward, fromIdx + 1, time);
      } else {
        stopHistories.reverse();
        return restoreAsyncHistory(stopHistories, handleMoveBackward, fromIdx - 1, time);
      }
    },
    [handleMoveForward, handleMoveBackward, time, historyDataList]
  );

  const getOldestHistory = useCallback(
    (fromIdx: number) => {
      const [from, to] = getFromTo(fromIdx, 0, false);
      const stopHistories = historyDataList.slice(from, to);
      stopHistories.reverse();

      stopHistories.forEach((historyData, idx) => handleMoveBackward({ historyData, idx, fromIdx: fromIdx - 1 }));
    },
    [historyDataList, handleMoveBackward]
  );

  const getYoungestHistory = useCallback(
    (fromIdx: number) => {
      const [from, to] = getFromTo(fromIdx, -1, true);
      const stopHistories = historyDataList.slice(from, to);

      stopHistories.forEach((historyData, idx) => handleMoveForward({ historyData, idx, fromIdx: fromIdx + 1 }));
    },
    [historyDataList, handleMoveForward]
  );

  const playHistories = useCallback(
    (fromIdx: number, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>) => {
      let idx = 1;

      intervalId.current = setInterval(() => {
        if (fromIdx + idx === 0) {
          setIsPlaying(false);
          setIsCalculating(false);
          clearInterval(intervalId.current!);
          return;
        }

        const historyData = historyDataList.at(fromIdx + idx)!;
        handleMoveForward({ historyData, idx, fromIdx });
        idx++;
      }, time);
    },
    [historyDataList, intervalId.current, handleMoveForward, time, setIsCalculating]
  );

  const stopHistories = useCallback(() => {
    clearInterval(intervalId.current!);
  }, [intervalId.current]);

  return {
    historyController,
    getOldestHistory,
    getYoungestHistory,
    playHistories,
    stopHistories,
  };
};

export default useHistoryController;
