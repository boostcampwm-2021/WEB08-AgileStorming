import useRoomId from 'hooks/useRoomId';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { labelListState, projectIdState, sprintListState, userListState } from 'recoil/project';
import { project } from 'utils/api';

const useProject = () => {
  const [projectId, setProjectId] = useRecoilState(projectIdState);
  const setSprintList = useSetRecoilState(sprintListState);
  const setUserList = useSetRecoilState(userListState);
  const setLabelList = useSetRecoilState(labelListState);

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
  };

  useEffect(() => {
    setProjectInfoData();
    return () => {
      setProjectId(null);
    };
  }, []);
};

export default useProject;
