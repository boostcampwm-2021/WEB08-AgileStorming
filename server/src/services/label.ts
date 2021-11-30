import { getRepository } from 'typeorm';
import { findOneProject } from './project';
import { TAddLabel } from '../utils/event-type';
import { Label } from '../database/entities/Label';
import { Color } from '../database/entities/Color';

export const findOneLabel = (id: string) => {
  return getRepository(Label).findOne({ where: { id } });
};
export const createLabel = async (projectId: string, labelInfo: TAddLabel) => {
  const project = await findOneProject(projectId);
  const color = await getRepository(Color).createQueryBuilder().orderBy('RAND()').getOne();
  const newLabel = await getRepository(Label).save({ ...labelInfo, color: color.rgb, project });
  return newLabel;
};
export const deleteLabel = (labelId: number) => {
  return getRepository(Label).createQueryBuilder().delete().where({ id: labelId }).execute();
};
