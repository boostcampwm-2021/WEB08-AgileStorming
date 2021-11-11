import { historyHandler } from 'hooks/useHistoryReceiver';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { historyState } from 'recoil/history';
import { mindmapState } from 'recoil/mindmap';

const useHistoryController = () => {
  const [mindmap, setMindmap] = useRecoilState(mindmapState);
  const { histories } = useRecoilValue(historyState);
  const historyIdxRef = useRef(histories.length - 1);
  const lastMindmapRef = useRef(mindmap);

  const handleMoveForward = () => {
    if (historyIdxRef.current < histories.length - 2) {
      const nextIdx = historyIdxRef.current + 1;
      historyHandler({ mindmap, setMindmap, history: histories[nextIdx], isForward: true });
      historyIdxRef.current = nextIdx;
    }
  };

  const handleMoveBackward = () => {
    if (historyIdxRef.current > 0) {
      const prevIdx = historyIdxRef.current - 1;
      historyHandler({ mindmap, setMindmap, history: histories[prevIdx], isForward: true });
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
