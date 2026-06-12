import { DataSource } from 'typeorm';
import { createDatabaseOptions } from './database.factory';

export default new DataSource({
  ...createDatabaseOptions(),
  entities: ['dist/src/modules/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
