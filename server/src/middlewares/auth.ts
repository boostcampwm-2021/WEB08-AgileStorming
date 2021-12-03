import dotenv from 'dotenv';
import { Request, Response, Next } from 'express';
import jwt from 'jsonwebtoken';
import ErrorMessage from '../config/error-message';
dotenv.config();

interface IToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyToken = (req: Request, res: Response, next: Next) => {
  try {
    const token = req.cookies.token;
    const decoded: IToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded) {
      res.locals.userId = decoded.id;
      next();
    } else {
      res.status(401).send(ErrorMessage.WRONG_TOKEN);
    }
  } catch (err) {
    res.status(401).send(ErrorMessage.NO_TOKEN);
  }
};
