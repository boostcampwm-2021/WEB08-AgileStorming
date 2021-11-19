import { historyHandler } from 'hooks/useHistoryReceiver';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { historyDataListState } from 'recoil/history';
import { mindmapState } from 'recoil/mindmap';

const useHistoryController = () => {
  const [mindmap, setMindmap] = useRecoilState(mindmapState);
  // const { history } = useRecoilValue(historyState);
  const historyIdxRef = useRef(history.length - 1);
  const lastMindmapRef = useRef(mindmap);

  const handleMoveForward = () => {
    if (historyIdxRef.current < history.length - 2) {
      const nextIdx = historyIdxRef.current + 1;
      // historyHandler({ setMindmap, historyData: history[nextIdx], isForward: true });
      historyIdxRef.current = nextIdx;
    }
  };

  const handleMoveBackward = () => {
    if (historyIdxRef.current > 0) {
      const prevIdx = historyIdxRef.current - 1;
      // historyHandler({ setMindmap, historyData: history[prevIdx], isForward: true });
      historyIdxRef.current = prevIdx;
    }
  };

  const handleControlEnd = () => {
    setMindmap(lastMindmapRef.current);
  };

  return {
    handleMoveForward,
    handleMoveBackward,
    handleControlEnd,
  };
};

export default useHistoryController;
