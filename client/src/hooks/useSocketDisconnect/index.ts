import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { projectIdState } from 'recoil/project';
import { socketState } from 'recoil/socket';

const useSocketDisconnect = () => {
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  const setProjectId = useSetRecoilState(projectIdState);
  useEffect(() => {
    if (projectId) {
      window.socket!.emit('leave', projectId);
      window.socket = null;
      setSocket({ projectId: null });
      setProjectId(null);
    }
  }, [projectId, setSocket]);
};
export default useSocketDisconnect;
