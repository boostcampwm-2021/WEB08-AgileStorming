import React from 'react';
import { Tree } from 'components/molecules';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import { IMindmapData, IMindNode } from 'types/mindmap';
import { getAllChildren } from 'utils/helpers';

interface IProps {
  mindmapData: IMindmapData;
}

export interface ITaskFilters {
  sprint: number | null;
  user: string | null;
  label: number | null;
}

const MindmapTree: React.FC<IProps> = ({ mindmapData }) => {
  const rootId = mindmapData.rootId;
  const { deleteNode } = useHistoryEmitter();

  const handleDeleteBtnClick = (parentId: number, node: IMindNode) => {
    const sideEffect: IMindNode[] = getAllChildren(node, mindmapData);
    deleteNode({ nodeFrom: parentId, dataFrom: { ...node, sideEffect: sideEffect } });
  };

  return <Tree key={rootId} nodeId={rootId} mindmapData={mindmapData} parentCoord={null} handleDeleteBtnClick={handleDeleteBtnClick} />;
};

export default MindmapTree;
