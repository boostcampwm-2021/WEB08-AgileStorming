import { Router, Request, Response, Next } from 'express';
import { createCustomError } from '../utils';
import * as projectService from '../services/project';
import * as authService from '../services/auth';
const router = Router();

interface userToken {
  id: string;
}

router.post('/create', async (req: Request, res: Response, next: Next) => {
  try {
    const token = req.headers['x-access-token'] || req.query.token;
    if (!token) throw createCustomError(403, 'needs login');
    const decoded = await authService.verifyJWT(token);
    const { id } = decoded as userToken;
    const { name } = req.body;
    if (!name) throw createCustomError(400, 'no project name');
    await projectService.createProject(name, id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
