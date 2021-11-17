import { ILabel } from './label';
import { ISprint } from './sprint';
import { IUser } from './user';

export interface IProject {
  id: string;
  name: string;
  labels: ILabel[];
  sprints: ISprint[];
  users: IUser[];
  createdAt: Date;
}
