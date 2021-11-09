import { getRepository } from 'typeorm';
import { Mindmap } from '../database/entities/Mindmap';
import { findOneProject } from './project';

interface INode {
  label?: string;
  content?: string;
  posX?: string;
  posY?: string;
  children?: string;
}

export const getMindMap = async (projectId: string) => {
  return getRepository(Mindmap)
    .createQueryBuilder('mindmap')
    .innerJoinAndSelect('mindmap.project', 'project')
    .where('project.id = :projectId', { projectId })
    .getMany();
};
export const createNode = async (projectId: string, nodeInfo: INode) => {
  const project = await findOneProject(projectId);
  const newNode = { ...nodeInfo, project };
  return getRepository(Mindmap).save(newNode);
};
export const deleteNode = async (nodeId: number) => {
  return getRepository(Mindmap).createQueryBuilder().delete().where({ id: nodeId }).execute();
};
export const updateNode = async (nodeId: number, newData: INode) => {
  return getRepository(Mindmap).createQueryBuilder().update().set(newData).where('id = :nodeId', { nodeId }).execute();
};
