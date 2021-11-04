import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import projectRouter from './project';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);

export default router;
