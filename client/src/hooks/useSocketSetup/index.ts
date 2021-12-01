import useProjectId from 'hooks/useProjectId';
import useHistoryReceiver, { IHistoryReceiver } from 'hooks/useHistoryReceiver';
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { ISocket, socketState } from 'recoil/socket';
import io from 'socket.io-client';
import useUserReceiver, { IUserReceiver } from 'hooks/useUserReceiver';
import { parseHistoryEvent, parseNonHistoryEvent } from 'utils/parser';
import { INonHistoryEventData } from 'types/event';
import { userFocusNodeState } from 'recoil/project';

interface IInitProps {
  projectId: string;
  setSocket: SetterOrUpdater<ISocket>;
  historyReceiver: IHistoryReceiver;
  nonHistoryEventReceiver: (eventData: INonHistoryEventData) => void;
  userReceiver: IUserReceiver;
  setUserFocusNode: SetterOrUpdater<Map<string, number>>;
}

const initSocket = ({ projectId, setSocket, historyReceiver, nonHistoryEventReceiver, userReceiver, setUserFocusNode }: IInitProps) => {
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
    setUserFocusNode((prev) => {
      const next = new Map(prev);
      next.delete(userId);
      return next;
    });
  });
  socket.on('history-event', (data, dbData) => {
    const eventData = parseHistoryEvent(data, dbData);
    historyReceiver(eventData);
  });
  socket.on('non-history-event', (data, dbData) => {
    const eventData = parseNonHistoryEvent(data, dbData);
    nonHistoryEventReceiver(eventData);
  });
  socket.on('user-focus', (userId, nodeId) => {
    setUserFocusNode((prev) => {
      const next = new Map(prev);
      if (nodeId) next.set(userId, nodeId);
      else next.delete(userId);
      return next;
    });
  });
  setSocket({ projectId });
};

const useSocketSetup = () => {
  const newProjectId = useProjectId();
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  const setUserFocusNode = useSetRecoilState(userFocusNodeState);
  const { historyReceiver, nonHistoryEventReceiver } = useHistoryReceiver();
  const userReceiver = useUserReceiver();

  useEffect(() => {
    (async () => {
      const isNewProject = newProjectId && projectId !== newProjectId;
      if (!isNewProject) return;
      if (window.socket) {
        window.socket!.emit('leave', projectId);
        window.socket = null;
      }
      initSocket({ projectId: newProjectId, setSocket, historyReceiver, nonHistoryEventReceiver, userReceiver, setUserFocusNode });
    })();
  }, [newProjectId]);
};
export default useSocketSetup;
