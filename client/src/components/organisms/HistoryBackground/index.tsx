import { Background, DragTarget } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';
import { useRecoilValue } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { Mindmap } from '..';

const HistoryBackground = () => {
  const { containerRef, dragRef } = useDragBackground();
  const data = useRecoilValue(mindmapState);

  return (
    <>
      <Background refProp={containerRef} bgSize='over' bgColor='gray5' className='background' />
      <Background bgSize='over' zIndex={-10}>
        <Mindmap mindmapData={data} />
        <DragTarget ref={dragRef} />
      </Background>
    </>
  );
};

export default HistoryBackground;
