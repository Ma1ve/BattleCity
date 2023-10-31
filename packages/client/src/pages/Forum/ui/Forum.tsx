import { useState, useEffect, useCallback } from 'react'
import { Title } from '../../../shared/ui'
import { toast } from 'react-toastify'
import { ForumAPI, ITopic } from '../../../shared/api/ForumApi'
import { TopicViewModal } from './TopicViewModal'
import { NewTopicModal } from './NewTopicModal'
import styles from './forum.module.css'
import Spinner from '../../../shared/ui/Spinner/Spinner'

const stubValue: ITopic[] = [
  // {
  //   id: 1,
  //   title: 'Отзывы',
  //   author: 'ivan',
  //   commentCount: 1233,
  // },
  // {
  //   id: 2,
  //   title: 'Претензии',
  //   author: 'gleb',
  //   commentCount: 32,
  // },
  // {
  //   id: 3,
  //   title: 'Предоления о сотрудничестве',
  //   author: 'Sasha',
  //   commentCount: 1,
  // },
]

/** Компонент форума. */
export const Forum = () => {
  const [topics, setTopics] = useState<ITopic[] | undefined>(stubValue)

  /** Признак открытия модального окна топика. */
  const [showTopicViewModal, setShowTopicViewModal] = useState<boolean>(false)

  /** Признак открытия модального окна топика. */
  const [showNewTopicModal, setShowNewTopicModal] = useState<boolean>(false)

  /** Текущий топик выбранный пользователем. */
  const [currentTopic, setCurrentTopic] = useState<ITopic>()

  const [isLoading, setIsLoading] = useState(true)

  const getTopics = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await ForumAPI.getTopics()
      setTopics([...stubValue, ...(res || [])])
    } catch (e: any) {
      toast.error(e?.response?.data?.reason)
      setTopics(stubValue)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getTopics()
  }, [])

  const handleTopicOpen = useCallback(
    (topic: ITopic) => {
      setShowTopicViewModal(true)
      setCurrentTopic(topic)
    },
    [showNewTopicModal, currentTopic]
  )

  const handleTopicClose = () => {
    setShowTopicViewModal(false)
    getTopics()
  }

  return (
    <>
      <div className={styles.forumPage}>
        <div
          className={styles.forumAddNewButton}
          onClick={() => setShowNewTopicModal(true)}>
          +
        </div>
        <Title>Forum</Title>
        <div className={styles.forumWrapper}>
          {!isLoading ? (
            <>
              {topics?.map((topic: ITopic) => (
                <div
                  key={topic.id}
                  className={styles.forum}
                  onClick={() => handleTopicOpen(topic)}>
                  <div className={styles.forumTitle}>{topic.title}</div>
                  <div
                    className={
                      styles.forumAuthor
                    }>{`author: ${topic.author}`}</div>
                  <div className={styles.forumContent}>
                    <div className={styles.forumContentWrapper}>
                      <div className={styles.forumContentText}>
                        {`comments: ${topic.commentCount}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      {showTopicViewModal && (
        <TopicViewModal
          {...(currentTopic as ITopic)}
          onClose={handleTopicClose}
        />
      )}
      {showNewTopicModal && (
        <NewTopicModal
          onClose={() => setShowNewTopicModal(false)}
          onReload={getTopics}
        />
      )}
    </>
  )
}
