import { useRecoilValue } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { MindmapBackground } from 'components/molecules';
import { Mindmap, MindmapBtnWrapper } from 'components/organisms';

const ROOT_NODE_ID = -1;

const MindmapTemplate: React.FC = () => {
  const mindmapData = useRecoilValue(mindmapState);
  const isLoaded = !!(mindmapData.rootId !== ROOT_NODE_ID);
  return (
    <MindmapBackground className='mindmap-area background'>
      {isLoaded && <Mindmap mindmapData={mindmapData} />}
      <MindmapBtnWrapper />
    </MindmapBackground>
  );
};

export default MindmapTemplate;
