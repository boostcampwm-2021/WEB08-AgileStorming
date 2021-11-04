import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Project } from './Project';

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
}
