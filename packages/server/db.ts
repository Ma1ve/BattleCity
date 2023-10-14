import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import Themes from './models/Themes'
import Users from './models/Users'

const {  POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: Number(POSTGRES_PORT),
    models: [Themes, Users],
}

export async function createSequelizeConnection() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Themes, Users])

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('➜ 🎸 Connected to the database.')
  } catch (error: any) {
    console.error(`Error:`, error.message)
  }
  return sequelize
}
