import 'reflect-metadata';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Error, Request, Response, Next } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import ormConfig from '../ormconfig';
import router from './routes';
import { socketIO } from './utils';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
socketIO(server, process.env.ORIGIN);

createConnection(ormConfig)
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use('/api', router);

app.use(function (err: Error, req: Request, res: Response, next: Next) {
  if (err.status) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.message });
});

server.listen(port, () => console.log(`Server listen ${port}...`));
