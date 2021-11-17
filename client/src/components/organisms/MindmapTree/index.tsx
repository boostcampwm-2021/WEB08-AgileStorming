import { Tree } from 'components/molecules';
import React from 'react';
import { IMindmapData } from 'types/mindmap';

interface IProps {
  mindmapData: IMindmapData;
}

const MindmapTree: React.FC<IProps> = ({ mindmapData }) => {
  const rootId = mindmapData.rootId;

  return <Tree key={rootId} nodeId={rootId} mindmapData={mindmapData} parentCoord={null} />;
};

export default MindmapTree;
