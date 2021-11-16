import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Mindmap {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.mindmap, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ default: '[]' })
  children: string;

  @Column()
  content: string;

  @Column({ default: null })
  posX: string;

  @Column({ default: null })
  posY: string;

  @CreateDateColumn()
  createdAt: Date;
}
