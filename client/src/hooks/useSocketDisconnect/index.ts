import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { socketState } from 'recoil/socket';

const useSocketDisconnect = () => {
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  useEffect(() => {
    if (projectId) {
      console.log('socket leave');
      window.socket!.emit('leave', projectId);
      window.socket = null;
      setSocket({ projectId: null });
    }
  }, [projectId, setSocket]);
};
export default useSocketDisconnect;
