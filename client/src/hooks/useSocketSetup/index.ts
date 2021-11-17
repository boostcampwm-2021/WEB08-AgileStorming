import useProjectId from 'hooks/useRoomId';
import useHistoryReceiver, { IHistoryReceiver } from 'hooks/useHistoryReceiver';
import { useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { getParsedHistory } from 'recoil/history';
import { ISocket, socketState } from 'recoil/socket';
import io from 'socket.io-client';
import useUserReceiver, { IUserReceiver } from 'hooks/useUserReceiver';
import { project } from 'utils/api';
import { mindmapState } from 'recoil/mindmap';
import { IMindNode, IMindNodes } from 'types/mindmap';

interface IInitProps {
  projectId: string;
  setSocket: SetterOrUpdater<ISocket>;
  historyReceiver: IHistoryReceiver;
  userReceiver: IUserReceiver;
}

interface IDataProps extends Partial<IMindNode> {
  id?: number;
  createdAt: string;
}

const getInitInfo = async (newProjectId: string) => {
  const { data } = await project.getInfo(newProjectId);
  const initNodes = new Map(
    data.mindmap.map((node: IDataProps) => {
      const { id: nodeId, ...props } = node;
      return [nodeId, { nodeId, ...props }];
    })
  );
  const rootId = data.mindmap.filter((node: IDataProps) => node.level === 'ROOT')[0].id;
  return { rootId: rootId, mindNodes: initNodes as IMindNodes };
};

const initSocket = ({ projectId, setSocket, historyReceiver, userReceiver }: IInitProps) => {
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
  socket.on('event', (data, dbData) => {
    const history = getParsedHistory(data, dbData);
    console.log('event', history);
    historyReceiver(history);
  });
  setSocket({ projectId });
};

const useSocketSetup = () => {
  const newProjectId = useProjectId();
  const [{ projectId }, setSocket] = useRecoilState(socketState);
  const setMindmap = useSetRecoilState(mindmapState);
  const historyReceiver = useHistoryReceiver();
  const userReceiver = useUserReceiver();

  useEffect(() => {
    (async () => {
      const isNewProject = projectId !== newProjectId;
      if (isNewProject) {
        if (projectId) {
          window.socket!.emit('leave', projectId);
          window.socket = null;
        }
        const initMap = await getInitInfo(newProjectId);
        setMindmap(initMap);
        initSocket({ projectId: newProjectId, setSocket, historyReceiver, userReceiver });
      }
    })();
  }, [newProjectId, projectId, setSocket, historyReceiver, userReceiver]);
};
export default useSocketSetup;
