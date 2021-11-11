import redis from 'redis';

export const xread = (stream: string, id: string, callback: (str) => void) => {
  const xreadClient = redis.createClient();
  xreadClient.xread('BLOCK', 0, 'STREAMS', stream, id, (err, str) => {
    if (err) throw err;
    callback(str);
    xreadClient.quit();
  });
};

const xaddClient = redis.createClient();
export const xadd = ({ stream, args }: { stream: string; args: string[] }) => {
  xaddClient.xadd(stream, '*', ...args, (err, stream) => {
    if (err) throw err;
  });
};
