import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import projectRouter from './project';
import historyRouter from './history';
import sampleRouter from './sample';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/history', historyRouter);
router.use('/sample', sampleRouter);

export default router;
