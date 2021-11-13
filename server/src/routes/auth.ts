import { Router, Request, Response, Next } from 'express';
import { createCustomError } from '../utils';
import * as userService from '../services/user';
import * as authService from '../services/auth';
import ErrorMessage from '../config/error-message';
const router = Router();

router.post('/login', async (req: Request, res: Response, next: Next) => {
  try {
    const { id } = req.body;
    const user = await userService.findOneUser(id);
    if (!user) {
      throw createCustomError(401, ErrorMessage.UNREGISTERED_USER);
    }
    const token = authService.createJWTToken(id);
    res.cookie('token', token).sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.post('/register', async (req: Request, res: Response, next: Next) => {
  try {
    const { id, name } = req.body;
    const user = await userService.findOneUser(id);
    if (user) {
      throw createCustomError(406, ErrorMessage.USED_ID);
    }
    await userService.createUser(id, name);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
