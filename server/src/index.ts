import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import userRouter from './routes/user';
import ormconfig from '../ormconfig';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const connection = createConnection(ormconfig);

app.use(bodyParser.json());

app.use('/', userRouter);

app.listen(port);

console.log(`server listen ${port}...`);
