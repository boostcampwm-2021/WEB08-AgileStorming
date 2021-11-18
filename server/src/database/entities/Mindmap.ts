import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Comment } from './Comment';
import { Project } from './Project';
import { Task } from './Task';

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

  @Column()
  level: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.node, { cascade: true })
  comment: Comment[];

  @OneToOne(() => Task, (task) => task.taskId, { cascade: true, nullable: true })
  task: Task;
}
