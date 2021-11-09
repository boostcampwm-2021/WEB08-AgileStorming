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

    this.socket.on('joined', (id) => {
      console.log('joined', id);
    });
    this.socket.on('left', (id) => {
      console.log('left', id);
    });
    this.socket.on('event', (data) => {
      console.log('event', data);
    });
    const nodeFrom = '';
    const nodeTo = '';
    const dataFrom = '';
    setTimeout(
      () => this.socket.emit('event', 'ADD_NODE', JSON.stringify({ nodeFrom, nodeTo, dataFrom, dataTo: { content: '123' } })),
      1000
    );

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
