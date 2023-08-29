import Title from '../../shared/ui/Title'
import styles from './endgame.module.css'

const EndGame = () => {
  const score = 0

  return (
    <div className={styles.endGameWrapper}>
      <Title className={styles.endGameTitle} text="Game over" />
      <Title className={styles.endGameScore} text={`Score: ${score}`} />
    </div>
  )
}

export default EndGame
