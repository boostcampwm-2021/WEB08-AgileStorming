import { Tree } from 'components/molecules';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { assigneeFilterState, labelFilterState, sprintFilterState, userListState } from 'recoil/project';
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
  const userList = useRecoilValue(userListState);
  const { deleteNode } = useHistoryEmitter();
  const taskFilters: ITaskFilters = {
    sprint: useRecoilValue(sprintFilterState),
    user: useRecoilValue(assigneeFilterState),
    label: useRecoilValue(labelFilterState),
  };
  const isFiltering = !!Object.values(taskFilters).reduce((acc, filter) => (acc += filter ? filter : ''), '');

  const handleDeleteBtnClick = (parentId: number, node: IMindNode) => {
    const sideEffect: IMindNode[] = getAllChildren(node, mindmapData);
    deleteNode({ nodeFrom: parentId, dataFrom: { ...node, sideEffect: sideEffect } });
  };

  return (
    <Tree
      key={rootId}
      nodeId={rootId}
      mindmapData={mindmapData}
      parentCoord={null}
      taskFilters={taskFilters}
      isFiltering={isFiltering}
      userList={userList}
      handleDeleteBtnClick={handleDeleteBtnClick}
    />
  );
};

export default MindmapTree;
