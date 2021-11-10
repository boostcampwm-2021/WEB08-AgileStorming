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
export const createNode = async (projectId: string, parendId: number | null, nodeInfo: INode) => {
  const project = await findOneProject(projectId);
  const newNode = await getRepository(Mindmap).save({ children: JSON.stringify([]), ...nodeInfo, project });
  if (parendId) {
    addNodeToParent(parendId, newNode.id);
  }
  return newNode.id;
};
export const deleteNode = async (parendId: number, nodeId: number) => {
  deleteNodeFromParent(parendId, nodeId);
  deleteNodeAndChildren(nodeId);
  return;
};
export const updateNode = async (nodeId: number, newData: INode) => {
  return getRepository(Mindmap).createQueryBuilder().update().set(newData).where('id = :nodeId', { nodeId }).execute();
};
const addNodeToParent = async (parendId: number | null, newNodeId: number) => {
  const parent = await findOneNode(parendId);
  const children = [...JSON.parse(parent.children), newNodeId];
  updateNode(parendId, { children: JSON.stringify(children) });
};
const deleteNodeFromParent = async (parendId: number | null, nodeId: number) => {
  const parent = await findOneNode(parendId);
  const children = JSON.parse(parent.children).filter((childId: number) => childId !== nodeId);
  updateNode(parendId, { children: JSON.stringify(children) });
};
const deleteNodeAndChildren = async (nodeId: number) => {
  const node = await findOneNode(nodeId);
  const children = JSON.parse(node.children) as number[];
  if (children.length > 0) {
    children.forEach((child) => deleteNodeAndChildren(child));
  }
  getRepository(Mindmap).createQueryBuilder().delete().where({ id: nodeId }).execute();
};
const findOneNode = (nodeId: number) => {
  const id = nodeId.toString(10);
  return getRepository(Mindmap).findOne({ where: { id } });
};
