import { H1 } from '../../shared/ui'

import styles from './endgame.module.css'

const EndGame = () => {
  const score = 0

  return (
    <div className={styles.endGameWrapper}>
      <H1 className={styles.endGameTitle} children="Game over" />
      <H1 className={styles.endGameScore} children={`Score: ${score}`} />
    </div>
  )
}

export default EndGame
