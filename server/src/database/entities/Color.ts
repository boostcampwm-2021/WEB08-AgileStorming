import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryColumn()
    rgb: string;
}
