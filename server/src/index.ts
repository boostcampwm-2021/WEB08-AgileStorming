import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { createConnection } from 'typeorm';

import authRouter from './routes/auth';
import userRouter from './routes/user';

import ormConfig from '../ormconfig';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

createConnection(ormConfig)
  .then(() => console.log(`Database connected`))
  .catch((error) => console.log(error));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(function (err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.message });
});

app.listen(port);

console.log(`Server listen ${port}...`);
