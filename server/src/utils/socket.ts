import { Server, Socket } from 'socket.io';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { xread, xadd } from './redis';
import { convertEvent } from './event-converter';
import { getUserHasProject, addUserToProject } from '../services/project';

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
    const projectId = socket.handshake.query.projectId as string;

    const handleNewEvent = async (data: Record<number, object>) => {
      const eventData = data[0][1][0][1];
      const dbData = await convertEvent(eventData);
      socket.to(projectId).emit('event', eventData, dbData);
    };

    const handleNewUser = () => {
      addUserToProject(id, projectId);
      io.in(projectId).emit('new', id);
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

    socket.on('leave', (projectId) => {
      socket.leave(projectId);
      socket.disconnect();
    });

    socket.on('event', (type, data) => {
      xread(projectId, '$', handleNewEvent);
      xadd({
        stream: projectId,
        args: ['type', type, 'project', projectId, 'user', id, 'data', data],
      });
    });
  });
};
export default socketIO;
