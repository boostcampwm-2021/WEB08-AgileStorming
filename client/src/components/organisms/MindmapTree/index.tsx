import { Tree } from 'components/molecules';
import React from 'react';

import { IMindmapData } from 'recoil/mindmap';

interface IProps {
  mindmapData: IMindmapData;
}

const MindmapTree: React.FC<IProps> = ({ mindmapData }) => {
  const { rootId, mindNodes } = mindmapData;

  return <Tree key={rootId} nodeId={rootId} mindNodes={mindNodes} parentCoord={null} />;
};

export default MindmapTree;
