import { Router, Request, Response } from 'express';
const router = Router();

router.get('/status', (req: Request, res: Response) => {
  try {
    res.status(200).send('ok');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
