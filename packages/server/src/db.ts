import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Topic } from './models/forum/topic'
import { Reply } from './models/forum/reply'
import { Comment } from './models/forum/comment'
import Themes from './models/theme/Themes'
import Users from './models/user/Users'
import Emoji from './models/forum/emoji'

// Переменные process.env находятся в корневом каталоге, они будут прокидываться в файл db.ts с помощью docker-compose.

// Поэтому если вы запускаете server не при помощи docker-compose данные переменные в .env не будут распознаны, вы должны указать их вручную

// Если вы захотите использовать свою БД вам нужно заменить данные переменные на свои.

const {
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: Number(POSTGRES_PORT),
  models: [Themes, Users, Emoji],
}

export async function createSequelizeConnection() {
  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([Themes, Users, Topic, Comment, Reply, Emoji])

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('➜ 🎸 Connected to the database.')
  } catch (error: any) {
    console.error(`Error:`, error.message)
  }
  return sequelize
}
