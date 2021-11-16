import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Label {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(() => Project, (project) => project.labels, { onDelete: 'CASCADE' })
  project: Project;
}
