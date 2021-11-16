import { getRepository } from 'typeorm';
import { Comment } from '../database/entities/Comment';
import { findOneNode } from './mindmap';
import { TAddComment } from '../utils/event-type';

export const findOneComment = async (id: string) => {
  return getRepository(Comment).findOne({ where: { id } });
};
export const createComment = async ({ nodeId, comment }: TAddComment) => {
  const node = await findOneNode(nodeId);
  const newComment = await getRepository(Comment).save({ comment, node });
  return newComment.id;
};
export const deleteComment = async (commentId: number) => {
  return getRepository(Comment).createQueryBuilder().delete().where({ id: commentId }).execute();
};
