import { Background } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';
import useLinkClick from 'hooks/useLinkClick';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { historyMapDataState } from 'recoil/history';
import { getNextMapState, mindmapState } from 'recoil/mindmap';
import { Mindmap } from '..';

const UNDER_ELEMENT = -10;

const HistoryBackground = () => {
  const linkToMindmap = useLinkClick('mindmap');
  useDragBackground();
  const [historyMapData, setHistoryMapData] = useRecoilState(historyMapDataState);
  const mindmapData = useRecoilValue(mindmapState);

  useEffect(() => {
    if (!mindmapData.mindNodes.size) return linkToMindmap();
    const newMapData = getNextMapState(mindmapData);

    setHistoryMapData(newMapData);
  }, []);

  return (
    <>
      <Background bgSize='over' bgColor='gray5' className='background' />
      <Background bgSize='over' zIndex={UNDER_ELEMENT}>
        {historyMapData.mindNodes.size ? <Mindmap mindmapData={historyMapData} /> : null}
      </Background>
    </>
  );
};

export default HistoryBackground;
