import { DataSource } from 'typeorm';
import { env } from '../env';

export default new DataSource({
  type: 'postgres',

  host: env.database.host,
  port: env.database.port,

  username: env.database.user,
  password: env.database.password,

  database: env.database.name,

  entities: ['dist/**/*.entity.js'],

  migrations: ['dist/database/migrations/*.js'],
});
