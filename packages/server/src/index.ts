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

  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:3001',
        'https://localhost:3000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'https://127.0.0.1:3000',
        'http://veisa.ya-praktikum.tech',
        'https://veisa.ya-praktikum.tech',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  )

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/api/server', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.get('/api/theme', getTheme)
  app.post('/api/theme', setTheme)

  app.use('/api/topics', topicsRouter)
  app.use('/api/comments', commentsRouter)
  app.use('/api/replies', repliesRouter)

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

async function start() {
  await createSequelizeConnection()
  await startServer()
}

start()
