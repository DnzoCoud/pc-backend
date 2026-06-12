import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '../env';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: env.database.host,
  port: env.database.port,

  username: env.database.user,
  password: env.database.password,

  database: env.database.name,

  autoLoadEntities: true,
  synchronize: true,
};
