import { useRecoilValue } from 'recoil';
import { Background } from 'components/atoms';
import { Mindmap, MindmapBtnWrapper } from 'components/organisms';
import { mindmapState, ROOT_NODE_ID } from 'recoil/mindmap';

const MindmapTemplate: React.FC = () => {
  const mindmapData = useRecoilValue(mindmapState);
  const isLoaded = mindmapData.rootId !== ROOT_NODE_ID;
  return (
    <Background className={'mindmap-area background'} bgSize='over' bgColor='bgWhite'>
      {isLoaded && <Mindmap mindmapData={mindmapData} />}
      <MindmapBtnWrapper />
    </Background>
  );
};

export default MindmapTemplate;
