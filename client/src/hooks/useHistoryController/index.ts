import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { historyMapDataState } from 'recoil/mindmap';

interface IHistoryControllerProps {
  from: number;
  to: number;
  isForward: boolean;
}

const useHistoryController = () => {
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);

  const handleMoveForward = () => {};

  const handleMoveBackward = () => {};

  const historyController = ({ from, to, isForward }: IHistoryControllerProps) => {
    // const targetData = isForward ? historyData : currentHistoryData;
    // const params = { historyData: targetData, isForward, setHistoryMapData, setHistoryDataList, historyDataList, historyMapData };
    // restoreHistory(params);
  };

  return historyController;
};

export default useHistoryController;
