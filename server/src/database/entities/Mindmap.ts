import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Mindmap {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.mindmap, { cascade: true })
  project: Project;

  @Column({ default: null })
  label: string;

  @Column({ default: null })
  children: string;

  @Column()
  content: string;

  @Column()
  posX: string;

  @Column()
  posY: string;

  @CreateDateColumn()
  createdAt: Date;
}
