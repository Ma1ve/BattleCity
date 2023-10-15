import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './src/models/forum/topic'
import { Reply } from './src/models/forum/reply'
import { Comment } from './src/models/forum/comment'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions = {
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  dialect: 'postgres',
} as SequelizeOptions

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([Topic, Comment, Reply]) // конкретные классы

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync({ force: true }) // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
