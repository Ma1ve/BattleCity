import express, { Request, Response } from 'express'
import { Comment } from '../models/forum/comment'
import { celebrate, Joi, Segments } from 'celebrate'

const createCommentSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    content: Joi.string().required(),
    author: Joi.string().required(),
  }),
})

const getCommentsSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    topicId: Joi.number().required(),
  }),
})

const router = express.Router()

router.post(
  '/:topicId/comments',
  createCommentSchema,
  async (req: Request, res: Response) => {
    try {
      const { content, author } = req.body
      const topicId = parseInt(req.params.topicId, 10) // ID топика из url

      // новый комментарий с данными из запроса
      // @ts-ignore
      const newComment = await Comment.create({
        content,
        author,
        topicId,
      })

      res.status(201).json(newComment)
    } catch (error) {
      console.error('Ошибка при создании комментария:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

router.get(
  '/:topicId',
  getCommentsSchema,
  async (req: Request, res: Response) => {
    try {
      const topicId = req.params.topicId // id топика из параметров запроса

      // все комменты с фильтрацией по topicId
      const comments = await Comment.findAll({
        where: { topicId: topicId },
      })

      res.status(200).json(comments)
    } catch (error) {
      console.error('Ошибка при получении комментариев:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

export default router
