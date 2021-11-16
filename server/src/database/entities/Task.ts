import { Entity, Column, OneToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Mindmap } from './Mindmap';
import { Label } from './Label';
import { Sprint } from './Sprint';

@Entity()
export class Task {
  @OneToOne(() => Mindmap, { primary: true })
  @JoinColumn({ name: 'nodeId' })
  nodeId: Mindmap;

  @Column()
  priority: string;

  @Column()
  assignee: string;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column()
  estimatedTime: string;

  @Column()
  finishedTime: string;

  @ManyToMany(() => Sprint, (sprints) => sprints.id, { cascade: true })
  @JoinTable()
  sprints: Sprint[];

  @ManyToMany(() => Label, (labels) => labels.id, { cascade: true })
  @JoinTable()
  labels: Label[];
}
