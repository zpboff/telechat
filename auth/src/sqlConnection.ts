import { Sequelize } from 'sequelize'
import { dbConfigs } from './configs';

const { password, username, port, database } = dbConfigs;

export const connection = new Sequelize(database, username, password, {
  dialect: "postgres",
  port: port
});

connection.authenticate();