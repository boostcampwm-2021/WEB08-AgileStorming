import useProjectId from 'hooks/useRoomId';
import useHistoryReceiver, { IHistoryReceiver } from 'hooks/useHistoryReceiver';
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ISocket, socketState } from 'recoil/socket';
import io from 'socket.io-client';
import useUserReceiver, { IUserReceiver } from 'hooks/useUserReceiver';
import { parseHistoryEvent, parseNonHistoryEvent } from 'utils/parser';
import { INonHistoryEventData } from 'types/event';

interface IInitProps {
  projectId: string;
  setSocket: SetterOrUpdater<ISocket>;
  historyReceiver: IHistoryReceiver;
  nonHistoryEventReceiver: (eventData: INonHistoryEventData) => void;
  userReceiver: IUserReceiver;
}

const initSocket = ({ projectId, setSocket, historyReceiver, nonHistoryEventReceiver, userReceiver }: IInitProps) => {
  console.log('socket connected');
  window.socket = io(process.env.REACT_APP_SERVER!, {
    query: {
      projectId,
    },
    transports: ['websocket'],
  });

  const { socket } = window;

  socket.once('init', (userList: string[]) => {
    userReceiver({ data: userList, type: 'INIT' });
  });

  socket.on('new', (userId: string) => {
    userReceiver({ data: userId, type: 'NEW' });
  });

  socket.on('joined', (userId: string) => {
    userReceiver({ data: userId, type: 'JOIN' });
  });
  socket.on('left', (userId: string) => {
    userReceiver({ data: userId, type: 'LEFT' });
  });
  socket.on('history-event', (data, dbData) => {
    const eventData = parseHistoryEvent(data, dbData);
    historyReceiver(eventData);
  });
  socket.on('non-history-event', (data, dbData) => {
    const eventData = parseNonHistoryEvent(data, dbData);
    nonHistoryEventReceiver(eventData);
  });
  setSocket({ projectId });
};

const useSocketSetup = () => {
  const newProjectId = useProjectId();
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  const { historyReceiver, nonHistoryEventReceiver } = useHistoryReceiver();
  const userReceiver = useUserReceiver();

  useEffect(() => {
    (async () => {
      const isNewProject = projectId !== newProjectId;
      if (!isNewProject) return;
      if (projectId) {
        console.log('socket leave');
        window.socket!.emit('leave', projectId);
        window.socket = null;
      }
      initSocket({ projectId: newProjectId, setSocket, historyReceiver, nonHistoryEventReceiver, userReceiver });
    })();
  }, [newProjectId, projectId, historyReceiver, userReceiver]);
};
export default useSocketSetup;
