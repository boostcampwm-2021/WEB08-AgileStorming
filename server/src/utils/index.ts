interface ICustomError extends Error {
  status?: number;
}

export const createCustomError = (status: number, msg: string) => {
  const err: ICustomError = new Error(msg);
  err.status = status;
  return err;
};

export * from './redis';
export { default as socketIO } from './socket';
