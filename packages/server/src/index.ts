import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createSequelizeConnection } from './db'
import { setTheme, getTheme } from '../controllers/controllerTheme'
dotenv.config()
import bodyParser from 'body-parser'
import topicsRouter from './routes/topicsRouter'
import commentsRouter from './routes/commentsRouter'
import repliesRouter from './routes/repliesRouter'

async function startServer() {
  const app = express()
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.get('/theme', getTheme)

  app.post('/theme', setTheme)

  app.use('/topics', topicsRouter)
  app.use('/comments', commentsRouter)
  app.use('/replies', repliesRouter)

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

async function start() {
  await createSequelizeConnection()
  await startServer()
}

start()