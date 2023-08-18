import { Link } from 'react-router-dom'

import styles from './page400.module.css'

const Page400 = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageWrapper}>
        <div className={styles.errorNumber}>400</div>
        <div className={styles.errorText}>Bad Request</div>
        <Link to="/" className={styles.errorLink}>
          go Back
        </Link>
      </div>
    </div>
  )
}

export default Page400
