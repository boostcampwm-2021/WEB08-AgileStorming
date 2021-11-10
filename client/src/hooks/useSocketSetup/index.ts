import useProjectId from 'hooks/useRoomId';
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ISocket, socketState } from 'recoil/socket';
import io from 'socket.io-client';

interface IInitProps {
  projectId: string;
  setSocket: SetterOrUpdater<ISocket>;
}

const initSocket = ({ projectId, setSocket }: IInitProps) => {
  window.socket = io(process.env.REACT_APP_SERVER!, {
    query: {
      projectId,
    },
    transports: ['websocket'],
  });

  const { socket } = window;

  socket.on('joined', (id) => {
    console.log('joined', id);
  });
  socket.on('left', (id) => {
    console.log('left', id);
  });
  socket.on('event', (data) => {
    console.log('event', data);
  });
  const nodeFrom = '';
  const nodeTo = '';
  const dataFrom = '';
  setTimeout(() => socket!.emit('event', 'ADD_NODE', JSON.stringify({ nodeFrom, nodeTo, dataFrom, dataTo: { content: '123' } })), 1000);
  setSocket({ projectId });
};

const useSocketSetup = () => {
  const newProjectId = useProjectId();
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  useEffect(() => {
    const isNewProject = projectId !== newProjectId;
    if (isNewProject) {
      if (projectId) {
        window.socket!.emit('leave', projectId);
        window.socket = null;
      }
      initSocket({ projectId: newProjectId, setSocket });
    }
  }, [newProjectId, projectId, setSocket]);
};
export default useSocketSetup;
