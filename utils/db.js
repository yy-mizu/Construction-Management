import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('M2_Construction', 'root', '', {
  host: '127.0.0.1',
  port: 2244,
  dialect: 'mysql',
});

export default sequelize;
