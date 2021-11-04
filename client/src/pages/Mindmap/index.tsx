import { MindmapBackground, MindmapTree } from 'components/molecules';
import MindmapWrapper from 'components/organisms/MindmapBtnWrapper';
import { useRecoilValue } from 'recoil';
import { mindMapState } from 'recoil/mindMap';

const Mindmap = () => {
  const mindMap = useRecoilValue(mindMapState);
  return (
    <>
      <MindmapBackground>
        <MindmapTree mindMap={mindMap} />
        <MindmapWrapper></MindmapWrapper>
      </MindmapBackground>
    </>
  );
};

export default Mindmap;
