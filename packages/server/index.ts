import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect, dbConnect } from './db'
import topicsRouter from './src/routes/topicsRouter'
import commentsRouter from './src/routes/commentsRouter'
import repliesRouter from './src/routes/repliesRouter'

const app = express()

app.use(
  cors({
    origin: '*',
    // Allow follow-up middleware to override this CORS for options
    preflightContinue: true,
  })
)

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()
dbConnect()

app.use(express.json())

app.use('/topics', topicsRouter)
app.use('/comments', commentsRouter)
app.use('/replies', repliesRouter)

app.use('/', (_, res) => {
  res.json('hello')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
