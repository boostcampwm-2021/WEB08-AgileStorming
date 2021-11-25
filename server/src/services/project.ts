import { getConnection, getManager, getRepository } from 'typeorm';
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

export const getProjectUserList = async (projectId: string) => {
  const project = await getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'users')
    .where('project.id = :projectId', { projectId })
    .getOne();
  return project.users;
};

export const getUserHasProject = async (userId: string, projectId: string) => {
  return getRepository(Project)
    .createQueryBuilder('project')
    .leftJoin('project.users', 'users')
    .where('users.id = :userId and project.id = :projectId', { userId, projectId })
    .getOne();
};

export const addUserToProject = async (userId: string, projectId: string) => {
  const project = await getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'users')
    .where('project.id = :projectId', { projectId })
    .getOne();
  const user = await findOneUser(userId);
  if (!project) return;
  if (!user) return;
  project.users = [...project.users, user];
  return getRepository(Project).save(project);
};

export const createProject = async (name: string, creator: string) => {
  const user = await findOneUser(creator);
  const newProject = await getRepository(Project).save({ name, creator: user, users: [user] });
  const rootId = await createNode(newProject.id, null, {
    level: 'ROOT',
    content: name,
    children: JSON.stringify([]),
  });
  newProject.rootId = rootId;
  return getRepository(Project).save(newProject);
};

export const deleteProject = async (userId: string, projectId: string) => {
  const user = await findOneUser(userId);
  const projectCondition = { id: projectId, creator: user };
  return getConnection().createQueryBuilder().delete().from(Project).where(projectCondition).execute();
};

export const findOneProject = async (id: string) => {
  return getRepository(Project).findOne({ where: { id } });
};

export const getProjectInfo = async (projectId: string) => {
  return getRepository(Project)
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'users')
    .leftJoinAndSelect('project.sprints', 'sprints')
    .leftJoinAndSelect('project.labels', 'labels')
    .where('project.id = :projectId', { projectId })
    .getOne();
};

export const getProjectNodeInfo = async (ProjectId: string) => {
  return getManager().query(
    `
  SELECT *
  FROM mindmap
  LEFT JOIN task
  ON mindmap.id = task.taskId
  WHERE mindmap.projectId = ? ;`,
    [ProjectId]
  );
};
