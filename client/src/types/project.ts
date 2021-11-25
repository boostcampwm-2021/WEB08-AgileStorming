import { ILabel } from './label';
import { IMindNode } from './mindmap';
import { ISprint } from './sprint';
import { IUser } from './user';

export interface IProject {
  id: string;
  name: string;
  labels: ILabel[];
  sprints: ISprint[];
  users: IUser[];
  mindmap: IMindmapData[];
  rootId: number;
  createdAt: Date;
}

export interface IMindmapData extends Partial<IMindNode> {
  id?: number;
  createdAt: string;
}
