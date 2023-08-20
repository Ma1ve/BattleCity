import { useState } from 'react'

import H1 from '../../shared/ui/H1'

import styles from './forum.module.css'

interface IForum {
  id: number
  name: string
  themeCount: number
  answerCount: number
}

const Forum = () => {
  const [forums, setForums] = useState<IForum[]>([
    {
      id: 1,
      name: 'New Game!',
      themeCount: 43,
      answerCount: 123,
    },
    {
      id: 2,
      name: 'How to play?',
      themeCount: 12,
      answerCount: 32,
    },
    {
      id: 3,
      name: 'Updates',
      themeCount: 123,
      answerCount: 13,
    },
    {
      id: 4,
      name: 'Bags!',
      themeCount: 1,
      answerCount: 14,
    },
    {
      id: 5,
      name: 'New Game!',
      themeCount: 44,
      answerCount: 13,
    },
    {
      id: 6,
      name: 'New Game!',
      themeCount: 121,
      answerCount: 12,
    },
  ])

  return (
    <div className={styles.forumPage}>
      <H1>Forum</H1>
      <div className={styles.forumWrapper}>
        {forums.map((forum: IForum) => (
          <div key={forum.id} className={styles.forum}>
            <div className={styles.forumTitle}>{forum.name}</div>
            <div className={styles.forumContent}>
              <div className={styles.forumContentWrapper}>
                <div className={styles.forumContentText}>
                  Theme:{forum.themeCount}
                </div>
                <div className={styles.forumContentIcon}>+</div>
              </div>
              <div className={styles.forumContentWrapper}>
                <div className={styles.forumContentText}>
                  Answer:{forum.answerCount}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forum
