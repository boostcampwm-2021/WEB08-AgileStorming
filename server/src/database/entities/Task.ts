import { Entity, Column, OneToOne, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { Mindmap } from './Mindmap';
import { Label } from './Label';
import { Sprint } from './Sprint';
import { User } from './User';

@Entity()
export class Task {
  @OneToOne(() => Mindmap, (mindmap) => mindmap.task, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nodeId' })
  nodeId: Mindmap;

  @Column({ nullable: true })
  priority: string;

  @ManyToOne(() => User, (assignee) => assignee.tasks, { cascade: true })
  assignee: User;

  @Column({ nullable: true })
  dueDate: string;

  @Column({ nullable: true })
  estimatedTime: string;

  @Column({ default: 'To Do' })
  status: string;

  @Column({ nullable: true })
  finishedTime: string;

  @ManyToOne(() => Sprint, (sprints) => sprints.id, { onDelete: 'SET NULL' })
  sprint: Sprint;

  @ManyToMany(() => Label, (labels) => labels.id, { cascade: true })
  @JoinTable()
  labels: Label[];
}
