import { Entity, Column, PrimaryColumn, BeforeInsert, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, Generated } from 'typeorm';
import { User } from './User';

@Entity()
export class Project {
  @PrimaryColumn('varchar')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (creator) => creator.id, { onDelete: 'CASCADE' })
  creator: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User, (participant) => participant.id, { onDelete: 'CASCADE' })
  @JoinTable()
  participant: string;
}
