import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './Project';
import { Task } from './Task';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Project, (project) => project.sprints, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Task, (task) => task.sprint, { onDelete: 'CASCADE' })
  tasks: Task[];
}
