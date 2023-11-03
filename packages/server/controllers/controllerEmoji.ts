import { Response } from 'express'
import { emojiData } from '../static/emojiData'
import Emoji from '../src/models/forum/emoji'

export const getAllEmoji = async (_: any, response: Response) => {
  try {
    const emoji = await Emoji.findAll({
      where: {},
    })

    if (!emoji || !emoji.length) {
      const data = Object.values(emojiData)

      const allEmojiPromises = data.map(async (emoji, index) => {
        return Emoji.create({
          index,
          code: emoji,
        })
      })

      const allEmoji = await Promise.all(allEmojiPromises)

      response.status(201).json({ emoji: allEmoji })
    } else {
      response.status(201).json({ emoji: emoji })
    }
  } catch (error) {
    response.status(500).json({ error: 'Не удалось получить эмодзи' })
  }
}
