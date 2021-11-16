import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Project, (project) => project.sprints, { onDelete: 'CASCADE' })
  project: Project;
}
