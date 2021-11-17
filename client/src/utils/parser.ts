import { IHistoryData } from 'types/history';

export const parseHistoryEvent = (data: string[], newNodeId?: number): IHistoryData => {
  const stringJson =
    data.reduce(
      (acc: string, v: string, i: number) => {
        if (!(i % 2)) {
          acc += `"${v}":`;
        } else {
          acc += v[0] === '{' ? `${v}` : `"${v}"`;
          if (i !== data.length - 1) acc += ', ';
        }
        return acc;
      },
      newNodeId ? `{"newNodeId": ${newNodeId},` : '{'
    ) + '}';
  return JSON.parse(stringJson);
};

export const parseNonHistoryEvent = (data: string[], dbData?: string) => {
  const stringJson =
    data.reduce(
      (acc: string, v: string, i: number) => {
        if (!(i % 2)) {
          acc += `"${v}":`;
        } else {
          acc += v[0] === '{' ? `${v}` : `"${v}"`;
          if (i !== data.length - 1) acc += ', ';
        }
        return acc;
      },
      dbData ? `{"dbData": ${dbData},` : '{'
    ) + '}';
  return JSON.parse(stringJson);
};
