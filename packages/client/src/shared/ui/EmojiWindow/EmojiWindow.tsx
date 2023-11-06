import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useGetAllEmojiQuery } from '../../../app/store/api/emojiAPI'
import Spinner from '../Spinner/Spinner'

type IProps = {
  onSelectEmoji: (code: string) => void
}

export const EmojiWindow = ({ onSelectEmoji }: IProps) => {
  const [emoji, setEmoji] = useState<string[]>([])

  const { data: emojiData, isLoading, isError } = useGetAllEmojiQuery('')

  useEffect(() => {
    if (emojiData) setEmoji(prevArg => [...prevArg, ...emojiData])
  }, [emojiData])

  return (
    <div className={styles.root}>
      {emoji.map((code: string) => {
        return (
          <div
            className={styles.emojiContainer}
            onClick={() => onSelectEmoji(code)}>
            <span className={styles.emoji} role="img" aria-label="Reaction">
              {code}
            </span>
          </div>
        )
      })}
      {isLoading ? <Spinner /> : null}
      {isError ? (
        <div className={styles.emojiError}>Что-то пошло не так</div>
      ) : null}
    </div>
  )
}
