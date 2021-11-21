import { Tree } from 'components/molecules';
import useHistoryEmitter from 'hooks/useHistoryEmitter';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { assigneeFilterState, labelFilterState, sprintFilterState, userListState } from 'recoil/project';
import { IMindmapData, IMindNode } from 'types/mindmap';

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

  const handleDeleteBtnClick = (node: IMindNode) => {
    const { nodeId } = node;
    deleteNode({ nodeFrom: nodeId, dataFrom: node });
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
