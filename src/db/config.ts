// @/connection.ts
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

const dbDriver = process.env.DB_DRIVER as Dialect;
const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT || 5432);
const dbUser = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
});

export default sequelizeConnection;
