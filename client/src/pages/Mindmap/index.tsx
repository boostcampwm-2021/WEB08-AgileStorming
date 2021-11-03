import { MindmapBackground, MindmapTree } from 'components/molecules';
import { useRecoilValue } from 'recoil';
// import { mindMapState } from 'recoil/mindMap';
import { IMindMap } from 'recoil/mindMap';

const Mindmap = () => {
  // const mindMap = useRecoilValue(mindMapState);
  const mindMap = getDummyMindmap();
  return (
    <>
      <MindmapBackground>
        <MindmapTree mindMap={mindMap} />
      </MindmapBackground>
    </>
  );
};

///더미코드 삭제 예정
const getDummyMindmap = (): IMindMap => {
  const mindNodes = new Map();
  Array(10)
    .fill(0)
    .map((v, i) => ({ nodeId: i + 10, level: 'task', content: 'task', children: [] }))
    .forEach((v) => mindNodes.set(v.nodeId, v));
  [
    { nodeId: 9, level: 'story', content: 'story', children: [10, 11] },
    { nodeId: 8, level: 'story', content: 'story', children: [12, 19] },
    { nodeId: 7, level: 'story', content: 'story', children: [] },
    { nodeId: 6, level: 'story', content: 'story', children: [13, 14, 15] },
    { nodeId: 5, level: 'story', content: 'story', children: [16] },
    { nodeId: 4, level: 'story', content: 'story', children: [17, 18] },
    { nodeId: 3, level: 'epic', content: 'epic', children: [] },
    { nodeId: 2, level: 'epic', content: 'epic', children: [4, 5, 6, 7] },
    { nodeId: 1, level: 'epic', content: 'epic', children: [8, 9] },
    { nodeId: 0, level: 'root', content: 'root', children: [1, 2, 3] },
  ].forEach((v) => mindNodes.set(v.nodeId, v));
  return {
    rootId: 0,
    mindNodes: mindNodes,
  };
};

export default Mindmap;
