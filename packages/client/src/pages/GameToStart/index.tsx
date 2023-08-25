import H1 from '../../shared/ui/H1'
import styles from './gametostart.module.css'

const GameToStart = () => {
  return (
    <div className={styles.gameToStartWrapper}>
      <div className={styles.gameToStartText}>
        <H1>Loading...</H1>
      </div>
      <div className={styles.loader}>
        <div className={styles.loaderIcon}></div>
      </div>
    </div>
  )
}

export default GameToStart
