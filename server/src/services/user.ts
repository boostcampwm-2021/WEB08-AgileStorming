import dotenv from 'dotenv';
import { getRepository } from 'typeorm';
import { Animal } from '../database/entities/Animal';
import { Color } from '../database/entities/Color';
import { User } from '../database/entities/User';
import { addUserToProject } from './project';

dotenv.config();

export const createUser = async (id: string, name: string) => {
  const animal = await getRepository(Animal).createQueryBuilder().orderBy('RAND()').getOne();
  const color = await getRepository(Color).createQueryBuilder().orderBy('RAND()').getOne();
  const newUser = { id, name, icon: animal.name, color: color.rgb };
  await getRepository(User).createQueryBuilder().insert().values(newUser).execute();
  addUserToProject(id, process.env.SAMPLE_PROJECT);
};

export const findOneUser = (id: string) => getRepository(User).findOne({ where: { id } });
