// import { Client } from 'pg'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './src/models/forum/topic'
import { Reply } from './src/models/forum/reply'
import { Comment } from './src/models/forum/comment'

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env

const clientData = {
  user: 'antonastreiko',
  host: 'localhost',
  database: 'veisa',
  password: 'newPassword',
  port: 5432,
}

export const createClientAndConnect = async () => {
  // try {
  //   const client = new Client(clientData)
  //
  //   await client.connect()
  //
  //   const res = await client.query('SELECT NOW()')
  //   console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
  //   client.end()
  //
  //   return client
  // } catch (e) {
  //   console.error(e)
  // }
  //
  // return null
}

const sequelizeOptions: SequelizeOptions = {
  ...clientData,
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

export const sequelize = new Sequelize(sequelizeOptions)

sequelize.addModels([Topic, Comment, Reply]) // конкретные классы

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
