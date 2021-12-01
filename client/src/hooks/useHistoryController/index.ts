import { useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentReverseIdxState,
  historyDataListState,
  historyMovingSpeedState,
  isHistoryCalculatingState,
  historyMapDataState,
} from 'recoil/history';
import { IHistoryData } from 'types/history';
import { restoreHistory } from 'hooks/useHistoryController/restoreHistory';

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

  const historyController = ({ fromIdx, toIdx }: IHistoryControllerProps) => {
    const isForward = fromIdx < toIdx;
    const [from, to] = getFromTo(fromIdx, toIdx, isForward);
    const stopHistories = historyDataList.slice(from, to);

    if (isForward) {
      return restoreAsyncHistory(stopHistories, handleMoveForward, fromIdx + 1, time);
    } else {
      stopHistories.reverse();
      return restoreAsyncHistory(stopHistories, handleMoveBackward, fromIdx - 1, time);
    }
  };

  const getOldestHistory = (fromIdx: number) => {
    const [from, to] = getFromTo(fromIdx, 0, false);
    const stopHistories = historyDataList.slice(from, to);
    stopHistories.reverse();

    stopHistories.forEach((historyData, idx) => handleMoveBackward({ historyData, idx, fromIdx: fromIdx - 1 }));
  };

  const getYoungestHistory = (fromIdx: number) => {
    const [from, to] = getFromTo(fromIdx, -1, true);
    const stopHistories = historyDataList.slice(from, to);

    stopHistories.forEach((historyData, idx) => handleMoveForward({ historyData, idx, fromIdx: fromIdx + 1 }));
  };

  const playHistories = (fromIdx: number, setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>) => {
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
  };

  const stopHistories = () => {
    clearInterval(intervalId.current!);
  };

  return {
    historyController,
    getOldestHistory,
    getYoungestHistory,
    playHistories,
    stopHistories,
  };
};

export default useHistoryController;
