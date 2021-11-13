import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, Generated } from 'typeorm';
import { User } from './User';
import { Mindmap } from './Mindmap';

@Entity()
export class Project {
  @PrimaryColumn('varchar')
  @Generated('uuid')
    id: string;

  @Column()
    name: string;

  @ManyToOne(() => User, (creator) => creator.projects, { cascade: true })
    creator: User;

  @CreateDateColumn()
    createdAt: Date;

  @ManyToMany(() => User, (users) => users.id, { cascade: true })
  @JoinTable()
    users: User[];

  @OneToMany(() => Mindmap, (mindmap) => mindmap.project, { cascade: true })
    mindmap: Mindmap[];
}
