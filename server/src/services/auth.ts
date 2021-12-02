import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

export const createJWTToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
};
