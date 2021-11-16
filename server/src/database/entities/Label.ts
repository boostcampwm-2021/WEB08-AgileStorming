import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Label {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;
}
