import useProjectId from 'hooks/useRoomId';
import useHistroyReceiver, { IHistoryReceiver } from 'hooks/useHistoryReceiver';
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { getParsedHistory, historyState } from 'recoil/history';
import { mindmapState } from 'recoil/mindmap';
import { ISocket, socketState } from 'recoil/socket';
import io from 'socket.io-client';
import useUserReceiver, { IUserReceiver } from 'hooks/useUserReceiver';

interface IInitProps {
  projectId: string;
  setSocket: SetterOrUpdater<ISocket>;
  historyReceiver: IHistoryReceiver;
  userReceiver: IUserReceiver;
}

const initSocket = ({ projectId, setSocket, historyReceiver, userReceiver }: IInitProps) => {
  window.socket = io(process.env.REACT_APP_SERVER!, {
    query: {
      projectId,
    },
    transports: ['websocket'],
  });

  const { socket } = window;

  socket.on('joined', (userId) => {
    console.log('joined', userId);
    userReceiver({ userId, type: 'JOIN' });
  });
  socket.on('left', (userId) => {
    console.log('left', userId);
    userReceiver({ userId, type: 'LEFT' });
  });
  socket.on('event', (data) => {
    console.log('event', data);
    const history = getParsedHistory(data);
    historyReceiver(history);
  });

  socket.on('serverEmit', (data) => {
    console.log('serverEmit');
  });
  setSocket({ projectId });
};

const useSocketSetup = () => {
  const newProjectId = useProjectId();
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  const [mindmap, setMindmap] = useRecoilState(mindmapState);
  const setHistory = useSetRecoilState(historyState);
  const historyReceiver = useHistroyReceiver({ mindmap, setMindmap, setHistory });
  const userReceiver = useUserReceiver();
  useEffect(() => {
    const isNewProject = projectId !== newProjectId;
    if (isNewProject) {
      if (projectId) {
        window.socket!.emit('leave', projectId);
        window.socket = null;
      }
      initSocket({ projectId: newProjectId, setSocket, historyReceiver, userReceiver });
    }
  }, [newProjectId, projectId, setSocket, historyReceiver, userReceiver]);
};
export default useSocketSetup;
