import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Mindmap } from './Mindmap';

@Entity()
export class Comment {
  @PrimaryColumn()
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Mindmap, (node) => node.comment, { onDelete: 'CASCADE' })
  node: Mindmap;
}
