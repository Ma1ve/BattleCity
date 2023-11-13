import { Request, Response } from 'express'

import Users from '../src/models/user/Users'
import Themes from '../src/models/theme/Themes'

export const setTheme = async (request: Request, response: Response) => {
  const { theme, id } = request.body

  try {
    await (Themes as any).upsert({
      theme,
      userId: id,
    })

    response.status(201).json({ theme })
  } catch (error) {
    response.status(500).json({ error: 'Не удалось сменить тему' })
  }
}

export const getTheme = async (request: Request, response: Response) => {
  const userId = request.query['id']

  try {
    const theme = await (Themes as any).findOne({
      where: { userId },
    })
    let newTheme = null

    if (!theme) {
      await Users.create({
        id: userId,
      })
      newTheme = await Themes.create({
        userId,
        theme: 'dark',
      })
    }

    response
      .status(201)
      .json({ theme: theme?.theme ?? (newTheme?.theme as any)?.theme })
  } catch (error) {
    response.status(500).json({ error: 'Не удалось получить тему' })
  }
}
