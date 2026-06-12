import { env } from '../env';

export function createDatabaseOptions() {
  return {
    type: 'postgres' as const,

    host: env.database.host,
    port: env.database.port,

    username: env.database.user,
    password: env.database.password,

    database: env.database.name,

    synchronize: false,
  };
}
