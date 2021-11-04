import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryColumn()
  name: string;
}
