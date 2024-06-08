import { Sequelize } from "sequelize";
import 'dotenv/config';

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connect to PostgreSQL database was established successfully');
  })
  .catch(e => console.log(e));