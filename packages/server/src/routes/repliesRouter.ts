import express, { Request, Response } from 'express'
import { Reply } from '../models/forum/reply'
import { celebrate, Joi, Segments } from 'celebrate'

const createReplySchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    content: Joi.string().required(),
    author: Joi.string().required(),
  }),
})

const getReplySchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    topicId: Joi.number().required(),
    commentId: Joi.number().required(),
  }),
})

const router = express.Router()

router.post(
  '/:topicId/comments/:commentId/replies',
  createReplySchema,
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

      res.status(200).json(newReply)
    } catch (error) {
      console.error('Ошибка при создании ответа:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

router.get(
  '/:topicId/comments/:commentId/replies',
  getReplySchema,
  async (req: Request, res: Response) => {
    try {
      const { topicId, commentId } = req.params

      // все реплаи с фильтрацией по commentId
      const replies = await Reply.findAll({
        where: {
          topicId: topicId,
          commentId: commentId,
        },
      })

      res.status(200).json(replies)
    } catch (error) {
      console.error('Ошибка при получении реплаев:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

export default router
