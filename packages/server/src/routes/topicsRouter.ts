import express, { Request, Response } from 'express'
import { Topic } from '../../dist/models/topic.model'

const topicsRouter = express.Router()

topicsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, author, content } = req.body

    // новый топик с данными из запроса
    // @ts-ignore
    const newTopic = await Topic.create({ title, author, content })

    // успешный ответ с созданным топиком
    res.status(201).json(newTopic)
  } catch (error) {
    console.error('Ошибка при создании топика:', error)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default topicsRouter
