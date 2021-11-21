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

  const historyController = async ({ fromIdx, toIdx }: IHistoryControllerProps) => {
    const isForward = fromIdx < toIdx;

    if (isForward) {
      const from = fromIdx + 1;
      const to = toIdx + 1 !== 0 ? toIdx + 1 : undefined;

      const stopHistories = historyDataList.slice(from, to);

      await stopHistories.reduce(async (lastPromise, historyData, idx) => {
        await lastPromise;
        await wait(700, handleMoveForward, { historyData, idx, fromIdx: fromIdx + 1 });
      }, Promise.resolve());
    } else {
      const from = toIdx + 1;
      const to = fromIdx + 1 !== 0 ? fromIdx + 1 : undefined;

      const stopHistories = historyDataList.slice(from, to);
      stopHistories.reverse();

      await stopHistories.reduce(async (lastPromise, historyData, idx) => {
        await lastPromise;
        await wait(700, handleMoveBackward, { historyData, idx, fromIdx: fromIdx - 1 });
      }, Promise.resolve());
    }
  };

  return historyController;
};

export default useHistoryController;
