import { Tree } from 'components/molecules';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { assigneeFilterState, labelFilterState, sprintFilterState, userListState } from 'recoil/project';
import { IMindmapData } from 'types/mindmap';

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
  const taskFilters: ITaskFilters = {
    sprint: useRecoilValue(sprintFilterState),
    user: useRecoilValue(assigneeFilterState),
    label: useRecoilValue(labelFilterState),
  };

  return <Tree key={rootId} nodeId={rootId} mindmapData={mindmapData} parentCoord={null} taskFilters={taskFilters} userList={userList} />;
};

export default MindmapTree;
