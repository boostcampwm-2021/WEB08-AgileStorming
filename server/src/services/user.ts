import { getConnection, getRepository } from 'typeorm';
import { User } from '../database/entities/User';

export const findOneUser = (id: string) => {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({ where: { id } });
};
