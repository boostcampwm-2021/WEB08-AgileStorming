import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryColumn()
  name: string;
}
