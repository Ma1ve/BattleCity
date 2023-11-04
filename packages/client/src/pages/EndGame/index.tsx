import { Title, ETitleSize } from '../../shared/ui'

import styles from './endgame.module.css'

const EndGame = () => {
  const score = 0

  return (
    <div className={styles.endGameWrapper}>
      <Title size={ETitleSize.LG} children="Game over" />
      <Title size={ETitleSize.SM} children={`Score: ${score}`} />
    </div>
  )
}

export default EndGame
