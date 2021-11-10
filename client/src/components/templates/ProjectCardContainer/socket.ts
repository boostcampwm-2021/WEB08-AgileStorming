import io, { Socket } from 'socket.io-client';

export class SocketManager {
  private static instance: SocketManager;
  private socketProjectId: string;
  public socket: Socket;
  constructor(projectId: string) {
    this.socket = io(process.env.REACT_APP_SERVER!, {
      query: {
        projectId,
      },
      transports: ['websocket'],
    });
    this.socketProjectId = projectId;
    this.socket.on('new', () => {
      console.log('new');
    });
    this.socket.once('init', (userList) => {
      console.log(userList);
    });
    this.socket.on('joined', (id) => {
      console.log('joined', id);
    });
    this.socket.on('left', (id) => {
      console.log('left', id);
    });
    this.socket.on('event', (eventLog, dbData) => {
      console.log('event', eventLog, dbData);
    });
    const eventType = 'ADD_NODE';
    const nodeFrom = 20;
    const nodeTo = null;
    const dataFrom = { nodeId: 26 };
    const dataTo = { content: '123345', posX: '1', posY: '2' };
    setTimeout(() => this.socket.emit('event', eventType, JSON.stringify({ nodeFrom, nodeTo, dataFrom, dataTo })), 1000);

    SocketManager.instance = this;
  }
  static init(projectId: string) {
    if (!SocketManager.instance) {
      return new SocketManager(projectId);
    } else {
      const { socket, socketProjectId } = SocketManager.instance;
      socket.emit('leave', socketProjectId);
      return new SocketManager(projectId);
    }
  }
}
