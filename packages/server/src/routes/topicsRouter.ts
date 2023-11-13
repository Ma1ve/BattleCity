import express, { Request, Response } from 'express'
import { Comment } from '../models/forum/comment'
import { celebrate, Joi, Segments } from 'celebrate'
import { Topic } from '../models/forum/topic'

const router = express.Router()

const createTopicSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    author: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
})

router.post('/', createTopicSchema, async (req: Request, res: Response) => {
  try {
    const { title, author, content } = req.body

    // новый топик с данными из запроса
    // @ts-ignore
    const newTopic = await Topic.create({ title, author, content })

    res.status(201).json(newTopic)
  } catch (error) {
    console.error('Ошибка при создании топика:', error)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

router.get('/', async (_, res: Response) => {
  try {
    // все топики для получения всех топиков
    const topics = await Topic.findAll({
      include: [
        {
          model: Comment,
          as: 'comments', // имя ассоциации
          attributes: ['id'], // выбрка только id (количество комментариев)
        },
      ],
    })

    // топики с кол-вом комментов
    const topicsWithCommentCount = topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      author: topic.author,
      commentCount: topic.comments.length,
    }))

    res.status(200).json(topicsWithCommentCount)
  } catch (error) {
    console.error('Ошибка при получении списка топиков:', error)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
