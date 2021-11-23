import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { xread, xadd } from './redis';
import { convertHistoryEvent, convertEvent } from './event-converter';
import { getUserHasProject, addUserToProject } from '../services/project';
import { findOneUser } from '../services/user';

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

  io.on('connection', async (socket: ISocket) => {
    const { id } = socket.decoded;
    console.log(id, 'connected');
    const projectId = socket.handshake.query.projectId as string;

    const handleNewEvent = async (data: Record<number, object>) => {
      const eventData = data[0][1][0][1];
      const dbData = await convertHistoryEvent(eventData);
      io.in(projectId).emit('history-event', eventData, dbData);
    };

    const handleNewUser = async () => {
      addUserToProject(id, projectId);
      const newUser = await findOneUser(id);
      io.in(projectId).emit('new', JSON.stringify(newUser));
    };

    socket.join(projectId);

    const userHasProject = await getUserHasProject(id, projectId);
    if (!userHasProject) handleNewUser();

    if (!userInRooms.hasOwnProperty(projectId)) {
      xread(projectId, '$', handleNewEvent);
      userInRooms[projectId] = [id];
    } else {
      userInRooms[projectId].push(id);
    }

    socket.emit('init', userInRooms[projectId]);
    socket.to(projectId).emit('joined', id);

    socket.on('disconnect', () => {
      userInRooms[projectId] = userInRooms[projectId].filter((user) => user !== id);
      socket.to(projectId).emit('left', id);
    });

    socket.on('leave', (targetProjectId) => {
      socket.leave(targetProjectId);
      console.log(id, 'leave');
      socket.disconnect();
    });

    socket.on('history-event', (type, data) => {
      xread(projectId, '$', handleNewEvent);
      xadd({
        stream: projectId,
        args: ['type', type, 'projectId', projectId, 'user', id, 'data', data],
      });
    });
    socket.on('non-history-event', async (type, data) => {
      const eventData = ['type', type, 'projectId', projectId, 'user', id, 'data', data];
      const dbData = await convertEvent(eventData);
      io.in(projectId).emit('non-history-event', eventData, dbData);
    });
  });
};
export default socketIO;
