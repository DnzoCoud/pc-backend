import { envSchema } from './env.schema';

const parsedEnv = envSchema.parse(process.env);

export const env = {
  node: {
    environment: parsedEnv.NODE_ENV,
    port: parsedEnv.PORT,
    jwt_secret: parsedEnv.JWT_SECRET,
    jwt_expires: parsedEnv.JWT_EXPIRES_IN,
  },

  database: {
    host: parsedEnv.DB_HOST,
    port: parsedEnv.DB_PORT,
    name: parsedEnv.DB_NAME,
    user: parsedEnv.DB_USER,
    password: parsedEnv.DB_PASSWORD,
  },
};
