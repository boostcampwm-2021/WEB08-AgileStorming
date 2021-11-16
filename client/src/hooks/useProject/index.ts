import useRoomId from 'hooks/useRoomId';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { projectIdState } from 'recoil/project';

const useProject = () => {
  const setProjectId = useSetRecoilState(projectIdState);
  const projectId = useRoomId();

  useEffect(() => {
    setProjectId(projectId);
    return () => {
      setProjectId(null);
    };
  }, []);
};

export default useProject;
