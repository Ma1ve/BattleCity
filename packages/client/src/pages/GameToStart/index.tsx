import H1 from '../../shared/ui/H1'
import Loader from '../../shared/ui/Loader'
import Title from '../../shared/ui/Title'
import styles from './gametostart.module.css'

const GameToStart = () => {
  return (
    <div className={styles.gameToStartWrapper}>
      <div className={styles.gameToStartText}>
        <Title className={styles.gameToStartTitle} text="Loading..." />
      </div>
      <Loader />
    </div>
  )
}

export default GameToStart
