import express, { Request, Response } from 'express'
import { Reply } from '../models/forum/reply'

interface CreateReplyRequest {
  content: string
}

const router = express.Router()

router.post(
  '/:topicId/comments/:commentId/replies',
  async (req: Request, res: Response) => {
    try {
      const { content } = req.body as CreateReplyRequest
      const topicId = parseInt(req.params.topicId, 10) // ID темы из URL
      const commentId = parseInt(req.params.commentId, 10) // ID комментария из URL

      //  новый ответ с данными из запроса
      // @ts-ignore
      const newReply = await Reply.create({
        content,
        topicId,
        commentId,
      })

      //  успешный ответ с созданным ответом
      res.status(201).json(newReply)
    } catch (error) {
      console.error('Ошибка при создании ответа:', error)
      res.status(500).json({ error: 'Ошибка сервера' })
    }
  }
)

export default router
