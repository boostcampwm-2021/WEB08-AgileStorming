import { getRepository } from 'typeorm';
import { findOneProject } from './project';
import { TAddSprint } from '../utils/event-type';
import { Sprint } from '../database/entities/Sprint';
import { Color } from '../database/entities/Color';

export const findOneSprint = (id: string) => {
  return getRepository(Sprint).findOne({ where: { id } });
};
export const createSprint = async (projectId: string, sprintInfo: TAddSprint) => {
  const project = await findOneProject(projectId);
  const color = await getRepository(Color).createQueryBuilder().orderBy('RAND()').getOne();
  const newSprint = await getRepository(Sprint).save({ ...sprintInfo, project, color: color.rgb });
  return newSprint;
};
export const deleteSprint = (sprintId: number) => {
  return getRepository(Sprint).createQueryBuilder().delete().where({ id: sprintId }).execute();
};
