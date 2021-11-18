import useRoomId from 'hooks/useRoomId';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mindmapState } from 'recoil/mindmap';
import { labelListState, projectIdState, sprintListState, userListState } from 'recoil/project';
import { ILabel } from 'types/label';
import { IMindNodes } from 'types/mindmap';
import { ISprint } from 'types/sprint';
import { IUser } from 'types/user';
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

    const sprintList: Record<number, ISprint> = {};
    projectInfo.sprints.forEach((sprint) => (sprintList[sprint.id] = sprint));
    setSprintList(sprintList);

    const userList: Record<string, IUser> = {};
    projectInfo.users.forEach((user) => (userList[user.id] = user));
    setUserList(userList);

    const labelList: Record<number, ILabel> = {};
    projectInfo.labels.forEach((label) => (labelList[label.id] = label));
    setLabelList(labelList);

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
