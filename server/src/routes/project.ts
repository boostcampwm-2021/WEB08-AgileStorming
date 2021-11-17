import { Router, Request, Response, Next } from 'express';
import { createCustomError } from '../utils';
import * as projectService from '../services/project';
import { verifyToken } from '../middlewares/auth';
import { identifyUser } from '../middlewares/user';
const router = Router();

router.get('/', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const projectList = await projectService.getUserProject(res.locals.user.id);
    res.send(projectList);
  } catch (e) {
    next(e);
  }
});

router.post('/create', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const { name } = req.body;
    if (!name) throw createCustomError(400, 'no project name');
    const newProject = await projectService.createProject(name, res.locals.user.id);
    res.send(newProject);
  } catch (e) {
    next(e);
  }
});

router.delete('/delete', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.body;
    await projectService.deleteProject(res.locals.user.id, projectId);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.get('/user-list', async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.query;
    const projectList = await projectService.getProjectUserList(projectId);
    res.send(projectList);
  } catch (e) {
    next(e);
  }
});

router.get('/info', async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.query;
    const projectInfo = await projectService.getProjectInfo(projectId);
    projectInfo.mindmap.forEach((node) => (node.children = JSON.parse(node.children)));
    res.send(projectInfo);
  } catch (e) {
    next(e);
  }
});

export default router;
