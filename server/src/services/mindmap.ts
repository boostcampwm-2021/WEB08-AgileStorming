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

const findOneNode = (nodeId: number) => {
  const id = nodeId.toString(10);
  return getRepository(Mindmap).findOne({ where: { id } });
};

export const updateNode = async (nodeId: number, newData: INode) => {
  return getRepository(Mindmap).createQueryBuilder().update().set(newData).where('id = :nodeId', { nodeId }).execute();
};

const addNodeToParent = async (parentId: number | null, newNodeId: number) => {
  const parent = await findOneNode(parentId);
  const children = [...JSON.parse(parent.children), newNodeId];
  updateNode(parentId, { children: JSON.stringify(children) });
};

export const createNode = async (projectId: string, parentId: number | null, nodeInfo: INode) => {
  const project = await findOneProject(projectId);
  const newNode = await getRepository(Mindmap).save({ children: JSON.stringify([]), ...nodeInfo, project });
  if (parentId) {
    addNodeToParent(parentId, newNode.id);
  }
  return newNode.id;
};

const deleteNodeFromParent = async (parentId: number | null, nodeId: number) => {
  const parent = await findOneNode(parentId);
  const children = JSON.parse(parent.children).filter((childId: number) => childId !== nodeId);
  updateNode(parentId, { children: JSON.stringify(children) });
};

const deleteNodeAndChildren = async (nodeId: number) => {
  const node = await findOneNode(nodeId);
  const children = JSON.parse(node.children) as number[];
  if (children.length > 0) {
    children.forEach((child) => deleteNodeAndChildren(child));
  }
  getRepository(Mindmap).createQueryBuilder().delete().where({ id: nodeId }).execute();
};

export const deleteNode = async (parentId: number, nodeId: number) => {
  deleteNodeFromParent(parentId, nodeId);
  deleteNodeAndChildren(nodeId);
  return;
};
