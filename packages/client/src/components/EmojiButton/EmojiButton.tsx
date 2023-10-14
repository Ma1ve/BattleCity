import { useState } from 'react'
import styles from './index.module.css'
import { EmojiWindow } from '../EmojiWindow/EmojiWindow'
import emojiIcon from '../../shared/images/emojiButton.svg'

export const EmojiButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpenEmojiWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOpen(prevArg => !prevArg)
  }

  return (
    <div className={styles.root}>
      <img
        className={styles.icon}
        alt="Emoji"
        src={emojiIcon}
        onClick={onOpenEmojiWindow}
      />
      {isOpen ? <EmojiWindow /> : null}
    </div>
  )
}
