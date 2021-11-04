import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const createJWTToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

export const verifyJWT = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
