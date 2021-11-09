import { Server, Socket } from 'socket.io';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { xread, xadd } from './redis';

dotenv.config();

interface ISocket extends Socket {
  decoded: Record<string, string>;
}

const socketIO = (server, origin) => {
  const userInRooms: Record<string, string[]> = {};
  const io = new Server(server, {
    cors: {
      origin,
    },
  });

  io.use((socket: ISocket, next) => {
    const cookie = socket.handshake.headers.cookie as string;
    const token = cookie.match('token=([^;]*)(;|$)')[1];
    if (!token) {
      return next(new Error('Authentication error'));
    }
    const callback = (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      next();
    };
    jwt.verify(token, process.env.JWT_SECRET_KEY, callback);
  });

  io.on('connection', (socket: ISocket) => {
    const { id } = socket.decoded;
    const projectId = socket.handshake.query.projectId as string;

    const handleNewEvent = (data: Record<number, object>) => {
      data[0][1].forEach((element) => {
        console.log('server event', element[1]);
        socket.to(projectId).emit('event', element[1]);
      });
    };
    socket.join(projectId);
    if (!userInRooms.hasOwnProperty(projectId)) {
      userInRooms[projectId] = [id];
    } else {
      userInRooms[projectId].push(id);
    }

    socket.to(projectId).emit('joined', id);

    socket.on('disconnect', () => {
      userInRooms[projectId] = userInRooms[projectId].filter((user) => user !== id);
      socket.to(projectId).emit('left', id);
    });

    socket.on('event', () => {
      xread(projectId, '$', handleNewEvent);
      xadd({ stream: projectId, args: ['project', projectId, 'user', id] });
    });
  });
};
export default socketIO;
