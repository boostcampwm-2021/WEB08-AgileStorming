import { Router, Request, Response } from 'express';
import { xrevrange } from '../utils';
const router = Router();

router.get('/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { rangeFrom, count } = req.query;

    const history: Array<string | string[]> = await xrevrange({ projectId, from: rangeFrom ?? '+', to: '-', count: count ?? 30 });
    res.status(200).send(history);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
