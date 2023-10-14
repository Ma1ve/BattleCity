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
