import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import cors from 'cors';
import redis from 'redis';
import router from './routes';
import ormConfig from '../ormconfig';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const redisClient = redis.createClient();

const xread = ({ stream, id }) => {
  redisClient.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
    if (err) return console.error('Error reading from stream:', err);
    str[0][1].forEach((message) => {
      id = message[0];
      console.log(id);
      console.log(message[1]);
    });
    setTimeout(() => xread({ stream, id }), 0);
  });
};

xread({ stream: 'foo', id: '$' });

createConnection(ormConfig)
  .then(() => console.log(`Database connected`))
  .catch((error) => console.log(error));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(cookieParser());
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
