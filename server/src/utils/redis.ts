import redis from 'redis';

export const xread = (stream: string, id: string, callback: (str) => void) => {
  const redisClient = redis.createClient();
  redisClient.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
    if (err) throw err;
    callback(str);
  });
};

export const xadd = ({ stream, args }: { stream: string; args: string[] }) => {
  const redisClient = redis.createClient();
  redisClient.xadd(stream, '*', ...args, (err, stream) => {
    if (err) throw err;
  });
};
