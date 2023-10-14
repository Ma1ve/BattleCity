import express, { Request, Response } from 'express'
import { Reply } from '../models/forum/reply'
import { celebrate, Joi } from 'celebrate'

const createReplySchema = Joi.object({
  content: Joi.string().required(),
  author: Joi.string().required(),
})

const router = express.Router()

router.post(
  '/:topicId/comments/:commentId/replies',
  celebrate({
    body: createReplySchema,
  }),
  async (req: Request, res: Response) => {
    try {
      const { content, author } = req.body
      const topicId = parseInt(req.params.topicId, 10) // ID темы из URL
      const commentId = parseInt(req.params.commentId, 10) // ID комментария из URL

      //  новый ответ с данными из запроса
      // @ts-ignore
      const newReply = await Reply.create({
        content,
        author,
        topicId,
        commentId,
      })

      res.status(201).json(newReply)
    } catch (error) {
      console.error('Ошибка при создании ответа:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

router.get('/:commentId', async (req: Request, res: Response) => {
  try {
    const commentId = req.params.commentId // id комментария из параметров запроса

    // все реплаи с фильтрацией по commentId
    const replies = await Reply.findAll({
      where: { commentId: commentId },
    })

    res.status(200).json(replies)
  } catch (error) {
    console.error('Ошибка при получении реплаев:', error)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
