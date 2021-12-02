import { Router } from 'express';
import authRouter from './auth';
import historyRouter from './history';
import projectRouter from './project';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/history', historyRouter);

export default router;
