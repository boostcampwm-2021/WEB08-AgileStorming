export const createCustomError = (status: number, msg: string) => {
  const err: { [k: string]: any } = new Error(msg);
  err.status = status;
  return err;
};

export * from './redis';
export { default as socketIO } from './socket';
