import redis from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

export const xread = (stream: string, id: string, callback: (str) => void) => {
  const xreadClient = redis.createClient({
    port: 6379,
    host: process.env.REDIS_HOST,
  });
  xreadClient.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
    if (err) throw err;
    callback(str);
    xreadClient.quit();
  });
};

const xaddClient = redis.createClient({
  port: 6379,
  host: process.env.REDIS_HOST,
});
export const xadd = ({ stream, args }: { stream: string; args: string[] }) => {
  xaddClient.xadd(stream, '*', ...args, (err, ErrorStream) => {
    if (err) throw err;
    if (ErrorStream) {
    }
  });
};
