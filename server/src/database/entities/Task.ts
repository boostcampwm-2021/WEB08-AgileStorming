import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Mindmap } from './Mindmap';

@Entity()
export class Task {
  @OneToOne(() => Mindmap, { primary: true })
  @JoinColumn({ name: 'nodeId' })
    nodeId: Mindmap;

  @Column()
    sprint: string;

  @Column()
    priority: string;

  @Column()
    inCharge: string;

  @Column({ type: 'datetime' })
    dueDate: Date;

  @Column()
    estimatedTime: string;

  @Column()
    finishedTime: string;
}
