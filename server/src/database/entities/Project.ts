import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, Generated } from 'typeorm';
import { User } from './User';
import { Mindmap } from './Mindmap';
import { Sprint } from './Sprint';
import { Label } from './Label';

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

  @Column({
    name: 'rootId',
    default: -1,
  })
  rootId: number;

  @OneToMany(() => Sprint, (sprint) => sprint.project, { cascade: true })
  sprints: Sprint[];

  @OneToMany(() => Label, (label) => label.project, { cascade: true })
  labels: Label[];
}
