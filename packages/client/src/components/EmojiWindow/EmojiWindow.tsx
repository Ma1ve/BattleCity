import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useGetAllEmojiQuery } from '../../app/store/api/emojiAPI'
import data from './testData.json'

export const EmojiWindow = () => {
  const [emoji, setEmoji] = useState<string[]>([])

  const { data: emojiData, isLoading, isError } = useGetAllEmojiQuery('')

  useEffect(() => {
    if (emojiData) setEmoji(prevArg => [...prevArg, ...emojiData])
  }, [emojiData])

  return (
    <div className={styles.root}>
      {Object.values(data.emoji).map((emoji: string) => {
        return (
          <span role="img" aria-label="Reaction">
            {emoji}
          </span>
        )
      })}
      {isLoading ? 'Загрузка...' : null}
      {isError ? 'Что-то пошло не так' : null}
    </div>
  )
}
