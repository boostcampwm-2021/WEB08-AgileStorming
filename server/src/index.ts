import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import cors from 'cors';

import router from './routes';

import ormConfig from '../ormconfig';
import dotenv from 'dotenv';
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
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['access-control-allow-origin', 'x-access-token', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
    maxAge: 3600,
    optionsSuccessStatus: 204,
  })
);

app.use('/', router);

app.use(function (err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.message });
});

app.listen(port);

console.log(`Server listen ${port}...`);
