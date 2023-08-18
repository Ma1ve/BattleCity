import { Link } from 'react-router-dom'

import styles from './page404.module.css'

const Page400 = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageWrapper}>
        <div className={styles.errorNumber}>404</div>
        <div className={styles.errorText}>Page Not Found</div>
        <Link to="/" className={styles.errorLink}>
          go Back
        </Link>
      </div>
    </div>
  )
}

export default Page400
