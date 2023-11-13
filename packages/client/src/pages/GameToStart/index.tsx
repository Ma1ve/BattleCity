import { Title, ETitleSize } from '../../shared/ui'
import Loader from '../../shared/ui/Loader'
import styles from './gametostart.module.css'

const GameToStart = () => {
  return (
    <div className={styles.gameToStartWrapper}>
      <div className={styles.gameToStartText}>
        <Title size={ETitleSize.MD} children="Loading..." />
      </div>
      <Loader />
    </div>
  )
}

export default GameToStart
