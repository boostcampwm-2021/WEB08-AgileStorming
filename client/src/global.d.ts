import { Socket } from 'socket.io-client';

declare global {
  interface Window {
    socket: Socket | null;
  }
}
