import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';
import { identifyUser } from '../middlewares/user';
import { addUserToProject } from '../services/project';
import { convertEvent, convertHistoryEvent } from '../utils/event-converter';
const router = Router();

router.post('/', verifyToken, identifyUser, async (req: Request, res: Response) => {
  const { type, projectId, data } = req.body;
  const eventData = ['type', type, 'project', projectId, 'user', res.locals.user.id, 'data', data];
  const eventType = ['ADD_SPRINT', 'ADD_LABEL', 'DELETE_SPRINT', 'DELETE_LABEL'];
  const historyEventType = ['ADD_NODE', 'DELETE_NODE', 'UPDATE_NODE_PARENT', 'UPDATE_NODE_CONTENT', 'UPDATE_TASK_INFORMATION'];
  if (eventType.includes(type)) {
    const dbData = await convertEvent(eventData);
    res.status(200).send(dbData);
  }
  if (historyEventType.includes(type)) {
    const dbData = await convertHistoryEvent(eventData);
    res.status(200).send(JSON.stringify(dbData));
  }
});

router.post('/user-project', async (req: Request, res: Response) => {
  const { userId, projectId } = req.body;
  const dbData = await addUserToProject(userId, projectId);
  res.status(200).send(JSON.stringify(dbData));
});

export default router;
