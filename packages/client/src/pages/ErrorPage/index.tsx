import { Link } from 'react-router-dom'
import styles from './errorPage.module.css'

interface IErrorPage {
  code: '400' | '404' | '500'
}

const ErrorPage = ({ code }: IErrorPage) => {
  const errorMessages = {
    '400': 'Bad Request',
    '404': 'Page Not Found',
    '500': 'Internal Server Error',
  }

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageWrapper}>
        <div className={styles.errorNumber}>{code}</div>
        <div className={styles.errorText}>{errorMessages[code]}</div>
        <Link to="/" className={styles.errorLink}>
          go Back
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
