import express, { Request, Response } from 'express'
import { Comment } from '../models/forum/comment'

interface CreateCommentRequest {
  content: string
}

const router = express.Router()

router.post('/:topicId/comments', async (req: Request, res: Response) => {
  try {
    const { content } = req.body as CreateCommentRequest
    const topicId = parseInt(req.params.topicId, 10) // ID топика из url

    // новый комментарий с данными из запроса
    // @ts-ignore
    const newComment = await Comment.create({
      content,
      topicId,
    })

    // успешный ответ с созданным комментарием
    res.status(201).json(newComment)
  } catch (error) {
    console.error('Ошибка при создании комментария:', error)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

export default router
