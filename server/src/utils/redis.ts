import redis from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

export const xread = (stream: string, id: string, callback: (str) => void) => {
  const xreadClient = redis.createClient({
    port: 6379,
    host: process.env.REDIS_HOST,
  });
  xreadClient.xread('BLOCK', 0, 'STREAMS', stream, id, (err, result) => {
    if (err) throw err;
    callback(result);
    xreadClient.quit();
  });
};

const redisClient = redis.createClient({
  port: 6379,
  host: process.env.REDIS_HOST,
});
export const xadd = ({ stream, args }: { stream: string; args: string[] }) => {
  redisClient.xadd(stream, '*', ...args, (err, result) => {
    if (err) throw err;
    if (result) {
    }
  });
};

export const xrevrange = ({ projectId, from, to, count }: Record<string, string>) => {
  return new Promise<Array<string | string[]>>((resolve) => {
    redisClient.xrevrange(projectId, from, to, 'COUNT', count, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};

export const deleteProjectHistory = (projectId: string) => {
  return new Promise<string>((resolve) => {
    redisClient.del(projectId, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
};
