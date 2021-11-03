import { Router, Request, Response, Next } from 'express';
import { createCustomError } from '../utils';
import * as userService from '../services/user';
import * as authService from '../services/auth';
const router = Router();

router.post('/login', async (req: Request, res: Response, next: Next) => {
  try {
    const { id } = req.body;
    const user = await userService.findOneUser(id);
    if (!user) {
      throw createCustomError(401, '등록되지 않은 회원입니다.');
    }
    const token = authService.createJWTToken(id);
    res.cookie('token', token).sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
