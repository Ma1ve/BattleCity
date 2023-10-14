import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect, dbConnect } from './db'
import topicsRouter from './src/routes/topicsRouter'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3001',
    // Allow follow-up middleware to override this CORS for options
    preflightContinue: true,
  })
)

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()
dbConnect()

app.use('/topics', topicsRouter)
app.use('/', (_, res) => {
  res.json('hello')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
