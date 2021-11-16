import { getRepository } from 'typeorm';
import { Sprint } from '../database/entities/Sprint';

export const findOneSprint = async (id: string) => {
  return getRepository(Sprint).findOne({ where: { id } });
};
