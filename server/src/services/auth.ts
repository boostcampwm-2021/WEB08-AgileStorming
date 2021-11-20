import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const createJWTToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
};
