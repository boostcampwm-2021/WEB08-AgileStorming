import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Mindmap } from './Mindmap';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Mindmap, (node) => node.comment, { onDelete: 'CASCADE' })
  node: Mindmap;
}
