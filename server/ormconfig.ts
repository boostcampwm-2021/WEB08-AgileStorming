import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();

const ormConfig: ConnectionOptionsWithSeed = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  seeds: ['src/database/seeds/**/*.seed.ts'],
  factories: ['src/database/factory/**/*.factory.ts'],
};

type ConnectionOptionsWithSeed = ConnectionOptions & {
  seeds: string[];
  factories: string[];
};

export default ormConfig;
