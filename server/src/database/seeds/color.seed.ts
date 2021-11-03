import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Color } from '../entities/Color';

const COLOR_LIST = ['6ED5EB', '4CB8B8', '94D3CC', '4CA1DE', 'D092E2', '817DCE', '4A6CC3', 'B9D58C', 'E6D267', 'E2B765'];

export default class CreateAnimals implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const seed = COLOR_LIST.map((animal) => ({ rgb: animal }));
    await connection.createQueryBuilder().insert().into(Color).values(seed).execute();
  }
}
