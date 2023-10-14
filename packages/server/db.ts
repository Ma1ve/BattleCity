import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './src/models/forum/topic'
import { Reply } from './src/models/forum/reply'
import { Comment } from './src/models/forum/comment'
import Themes from './models/Themes'
import Users from './models/Users'

const {
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_HOST
} = process.env

const sequelizeOptions: SequelizeOptions = {
    dialect: 'postgres',
    host: POSTGRES_HOST,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    port: Number(POSTGRES_PORT),
    models: [Themes, Users],
}

export async function createSequelizeConnection() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Themes, Users, Topic, Comment, Reply])

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('➜ 🎸 Connected to the database.')
  } catch (error: any) {
    console.error(`Error:`, error.message)
  }
  return sequelize
}
