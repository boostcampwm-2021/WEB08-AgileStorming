import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Animal } from '../entities/Animal';

const ANIMAL_LIST = ['panda', 'frog', 'dog', 'cat', 'rabbit'];

export default class CreateAnimals implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const seed = ANIMAL_LIST.map((animal) => ({ name: animal }));
    await connection.createQueryBuilder().insert().into(Animal).values(seed).execute();
  }
}
