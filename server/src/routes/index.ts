import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import projectRouter from './project';
import historyRouter from './history';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/history', historyRouter);

export default router;
