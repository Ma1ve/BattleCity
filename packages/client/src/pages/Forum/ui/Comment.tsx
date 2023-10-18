import { IComment } from '../../../shared/api/ForumApi'
import styles from './comment.module.css'

/**
 * @prop data Данные коммента
 */
interface ICommentProps {
  data: IComment
}

/** Компонент комментария. */
export const Comment = ({ data }: ICommentProps) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentAuthor}>{data.author}</div>
      <div className={styles.commentText}>{data.content}</div>
    </div>
  )
}
