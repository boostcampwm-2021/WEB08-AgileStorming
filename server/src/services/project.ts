import { getConnection, getRepository } from 'typeorm';
import { Project } from '../database/entities/Project';
import { findOneUser } from './user';

export const getUserProject = async (userId: string) => {
  return getRepository(Project)
    .createQueryBuilder('project')
    .leftJoin('project.users', 'users')
    .innerJoinAndSelect('project.creator', 'creator')
    .loadRelationCountAndMap('project.count', 'project.users')
    .where('users.id = :userId', { userId })
    .getMany();
};

export const createProject = async (name: string, creator: string) => {
  const user = await findOneUser(creator);
  const newProject = { name, creator: user, users: [user] };
  return getRepository(Project).save(newProject);
};

export const deleteProject = async (userId: string, projectId: string) => {
  const user = await findOneUser(userId);
  const deleteProject = { id: projectId, creator: user };
  return getConnection().createQueryBuilder().delete().from(Project).where(deleteProject).execute();
};
