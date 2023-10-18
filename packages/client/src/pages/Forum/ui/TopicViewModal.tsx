import { useState, useEffect } from 'react'
import { Modal } from '../../../shared/ui'
import { ForumAPI, ITopic, IComment } from '../../../shared/api/ForumApi'
import { Comment } from './Comment'
import { toast } from 'react-toastify'
import styles from './topicViewModal.module.css'

/**
 * @prop onClose Обработчик закрытия модального окна.
 */
interface ITopicViewModal {
  onClose: () => void
}

type ITopicViewModalProps = ITopicViewModal & ITopic

const stubValue: IComment[] = [
  {
    id: 1,
    content: 'text text text',
    author: 'ivan',
    topicId: 1,
    createdAt: '2023-10-14T17:38:27.655Z',
    updatedAt: '2023-10-14T17:38:27.655Z',
  },
  {
    id: 2,
    content: 'text text text text text text text ',
    author: 'albert',
    topicId: 1,
    createdAt: '2023-10-14T17:38:27.655Z',
    updatedAt: '2023-10-14T17:38:27.655Z',
  },
  {
    id: 3,
    content: 'text text text ',
    author: 'nadya',
    topicId: 1,
    createdAt: '2023-10-14T17:38:27.655Z',
    updatedAt: '2023-10-14T17:38:27.655Z',
  },
]

/** Компонент модального окна топика. */
export const TopicViewModal = ({
  onClose,
  title,
  id,
  author,
  commentCount,
}: ITopicViewModalProps) => {
  const [comments, setComments] = useState<IComment[]>(stubValue)

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await ForumAPI.getAllComments({ topicId: id as string })
        setComments([...stubValue, ...(res?.data || [])])
      } catch (e: any) {
        toast.error(e?.response?.data?.reason)
        setComments(stubValue)
      }
    }

    getComments()
  }, [])

  return (
    <Modal close={onClose} width={800} title={title}>
      <div className={styles.topicViewModalWrapper}>
        {comments?.map(comment => {
          return <Comment data={comment} />
        })}
      </div>
    </Modal>
  )
}
