import { Background } from 'components/atoms';
import useDragBackground from 'hooks/useDragBackground';
import { useRecoilValue } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { Mindmap } from '..';

const HistoryBackground = () => {
  useDragBackground();
  const data = useRecoilValue(mindmapState);

  return (
    <>
      <Background bgSize='over' bgColor='gray5' className='background' />
      <Background bgSize='over' zIndex={-10}>
        <Mindmap mindmapData={data} />
      </Background>
    </>
  );
};

export default HistoryBackground;
