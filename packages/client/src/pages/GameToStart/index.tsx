import { H1 } from '../../shared/ui'
import Loader from '../../shared/ui/Loader'
import styles from './gametostart.module.css'

const GameToStart = () => {
  return (
    <div className={styles.gameToStartWrapper}>
      <div className={styles.gameToStartText}>
        <H1 className={styles.gameToStartTitle} children="Loading..." />
      </div>
      <Loader />
    </div>
  )
}

export default GameToStart
