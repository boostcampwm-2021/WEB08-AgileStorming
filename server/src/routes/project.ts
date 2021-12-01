import { Router, Request, Response, Next } from 'express';
import { createCustomError, deleteProjectHistory } from '../utils';
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

router.get('/:projectId', async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.findOneProject(projectId);
    if (project) res.sendStatus(200);
    else throw createCustomError(404, 'project does not exist');
  } catch (e) {
    next(e);
  }
});

router.post('/', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const { name } = req.body;
    if (!name) throw createCustomError(400, 'no project name');
    const newProject = await projectService.createProject(name, res.locals.user.id);
    res.send(newProject);
  } catch (e) {
    next(e);
  }
});

router.delete('/:projectId', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.params;
    await projectService.deleteProject(res.locals.user.id, projectId);
    await deleteProjectHistory(projectId);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.get('/user-list/:projectId', async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.params;
    const projectList = await projectService.getProjectUserList(projectId);
    res.send(projectList);
  } catch (e) {
    next(e);
  }
});

router.get('/info/:projectId', async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.params;
    const projectInfo = await projectService.getProjectInfo(projectId);
    const projectNodeInfo = await projectService.getProjectNodeInfo(projectId);

    projectNodeInfo.forEach((node) => (node.children = JSON.parse(node.children)));
    res.send({ projectInfo, projectNodeInfo });
  } catch (e) {
    next(e);
  }
});

router.get('/queries/:projectId', verifyToken, identifyUser, async (req: Request, res: Response, next: Next) => {
  try {
    const { projectId } = req.params;
    const projectQueries = await projectService.getProjectServiceQueries(res.locals.user, projectId);
    console.log(projectQueries);
    res.send(projectQueries);
  } catch (e) {
    next(e);
  }
});

export default router;
