export const createCustomError = (status: number, msg: string) => {
  const err: { [k: string]: any } = new Error(msg);
  err.status = status;
  return err;
};
