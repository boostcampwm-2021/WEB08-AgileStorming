import { Router, Request, Response, Next } from 'express';
import { createCustomError } from '../utils';
import * as projectService from '../services/project';
import * as authService from '../services/auth';
const router = Router();

interface userToken {
  id: string;
}

router.get('/', async (req: Request, res: Response, next: Next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw createCustomError(403, 'needs login');
    const decoded = await authService.verifyJWT(token);
    const { id } = decoded as userToken;
    const projectList = await projectService.getUserProject(id);
    res.send(projectList);
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req: Request, res: Response, next: Next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw createCustomError(403, 'needs login');
    const decoded = await authService.verifyJWT(token);
    const { id } = decoded as userToken;
    const { name } = req.body;
    if (!name) throw createCustomError(400, 'no project name');
    const newProject = await projectService.createProject(name, id);
    res.send(newProject);
  } catch (e) {
    next(e);
  }
});

router.delete('/delete', async (req: Request, res: Response, next: Next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw createCustomError(403, 'needs login');
    const decoded = await authService.verifyJWT(token);
    const { id } = decoded as userToken;
    const { projectId } = req.body;
    await projectService.deleteProject(id, projectId);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
