import { getRepository } from 'typeorm';
import { Project } from '../database/entities/Project';

export const createProject = async (name: string, creator: string) => {
  const newProject = { name, creator };
  return getRepository(Project).createQueryBuilder().insert().values(newProject).execute();
};

export const deleteProject = async (userId: string, projectId: string) => {
  const deleteProject = { id: projectId, creatorId: userId };
  return getRepository(Project).createQueryBuilder().delete().from(Project).where(deleteProject).execute();
};
