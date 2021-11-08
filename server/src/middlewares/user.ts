import { Request, Response, Next } from 'express';
import ERROR_MESSAGE from '../config/error-message';
import * as userService from '../services/user';

export const identifyUser = async (req: Request, res: Response, next: Next) => {
  try {
    const { userId } = res.locals;
    const user = await userService.findOneUser(userId);
    if (!userId) {
      res.status(401).send(ERROR_MESSAGE.UNREGISTERED_USER);
    }
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
