import H1 from '../../shared/ui/H1'
import styles from './endgame.module.css'

const EndGame = () => {
  const score = 0

  return (
    <div className={styles.endGameWrapper}>
      <div className={styles.endGameText}>
        <H1>Game over</H1>
      </div>
      <div className={styles.score}>
        <H1>Score: {score}</H1>
      </div>
    </div>
  )
}

export default EndGame
