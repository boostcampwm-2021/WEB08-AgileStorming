import { useRecoilValue } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { MindmapBackground } from 'components/molecules';
import { Mindmap, MindmapBtnWrapper } from 'components/organisms';

const MindmapTemplate: React.FC = () => {
  const mindmapData = useRecoilValue(mindmapState);
  return (
    <MindmapBackground className='mindmap-area'>
      <Mindmap mindmapData={mindmapData} />
      <MindmapBtnWrapper />
    </MindmapBackground>
  );
};

export default MindmapTemplate;
