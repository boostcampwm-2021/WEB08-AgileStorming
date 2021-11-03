import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';

export const findOneUser = (id: string) => {
  const userRepository = getConnection().getRepository(User);
  return userRepository.findOne({ where: { id } });
};
