export type TIcon = 'panda' | 'frog' | 'dog' | 'cat' | 'rabbit';

export interface IUser {
  id: string;
  name: string;
  color: string;
  icon: TIcon;
}
