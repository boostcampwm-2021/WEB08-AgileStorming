import useRoomId from 'hooks/useRoomId';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { labelListState, projectIdState, sprintListState, userListState } from 'recoil/project';
import { IMindNodes } from 'types/mindmap';
import { project } from 'utils/api';

const useProject = () => {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const setSprintList = useSetRecoilState(sprintListState);
  const setUserList = useSetRecoilState(userListState);
  const setLabelList = useSetRecoilState(labelListState);
  const setMindmap = useSetRecoilState(mindmapState);

  const roomId = useRoomId();

  const setProjectInfoData = async () => {
    if (roomId === projectId) {
      return;
    }
    const projectInfo = await project.getInfo(roomId);
    setProjectId(roomId);
    setSprintList(projectInfo.sprints);
    setUserList(projectInfo.users);
    setLabelList(projectInfo.labels);

    const initNodes = new Map(
      projectInfo.mindmap.map((node) => {
        const { id: nodeId, ...props } = node;
        return [nodeId, { nodeId, ...props }];
      })
    );
    const rootId = projectInfo.mindmap.filter((node) => node.level === 'ROOT')[0].id;
    setMindmap({ rootId: rootId as number, mindNodes: initNodes as IMindNodes });
  };

  useEffect(() => {
    setProjectInfoData();
    return () => {
      setProjectId(null);
    };
  }, []);
};

export default useProject;
