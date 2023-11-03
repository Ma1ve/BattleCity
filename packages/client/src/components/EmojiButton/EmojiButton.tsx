import { Ref, useState } from 'react'
import styles from './index.module.css'
import { EmojiWindow } from '../EmojiWindow/EmojiWindow'
import emojiIcon from '../../shared/images/emojiButton.svg'

type IProps = {
  onSelectEmoji: (code: string) => void
}

export const EmojiButton = ({ onSelectEmoji }: IProps) => {
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
      {isOpen ? <EmojiWindow onSelectEmoji={onSelectEmoji} /> : null}
    </div>
  )
}
