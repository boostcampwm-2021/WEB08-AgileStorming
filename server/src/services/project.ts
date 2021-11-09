import { getConnection, getRepository } from 'typeorm';
import { Project } from '../database/entities/Project';
import { createNode } from './mindmap';
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
  const newProject = await getRepository(Project).save({ name, creator: user, users: [user] });
  createNode(newProject.id, { content: name, posX: '0', posY: '0' });
  return newProject;
};

export const deleteProject = async (userId: string, projectId: string) => {
  const user = await findOneUser(userId);
  const deleteProject = { id: projectId, creator: user };
  return getConnection().createQueryBuilder().delete().from(Project).where(deleteProject).execute();
};

export const findOneProject = async (id: string) => {
  return getRepository(Project).findOne({ where: { id } });
};
