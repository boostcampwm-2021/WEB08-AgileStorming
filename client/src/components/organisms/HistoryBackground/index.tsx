import { Background, DragTarget } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getNextMapState, mindmapState, historyMapDataState } from 'recoil/mindmap';
import { Mindmap } from '..';

const HistoryBackground = () => {
  const { containerRef, dragRef } = useDragBackground();
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const mindmapData = useRecoilValue(mindmapState);

  useEffect(() => {
    const newMapData = getNextMapState(mindmapData);

    setHistoryMapData(newMapData);
  });

  return (
    <>
      <Background refProp={containerRef} bgSize='over' bgColor='gray5' className='background' />
      <Background bgSize='over' zIndex={-10}>
        {historyMapData ? (
          <>
            <Mindmap mindmapData={historyMapData} />
            <DragTarget ref={dragRef} />
          </>
        ) : null}
      </Background>
    </>
  );
};

export default HistoryBackground;
