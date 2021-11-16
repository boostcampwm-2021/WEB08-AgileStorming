import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Project } from './Project';
import { Task } from './Task';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  icon: string;

  @OneToMany(() => Project, (project) => project.creator)
  projects: Project[];

  @OneToMany(() => Task, (tasks) => tasks.assignee)
  tasks: Task[];
}
