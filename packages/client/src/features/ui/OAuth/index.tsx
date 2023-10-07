import { useCallback } from 'react'

import { AuthAPI } from '../../../shared/api/AuthApi'
import { redirectUri } from '../../../shared/api/consts'
import yandexIcon from '../../../shared/images/yandexIcon.webp'
import { Button } from '../../../shared/ui'
import styles from './OAuth.module.css'

const OAuth = () => {
  const yandexLogin = useCallback(async () => {
    const serviceId = await AuthAPI.getServiceId(redirectUri)
    const yandexUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`
    window.location.href = yandexUrl
  }, [])

  return (
    <Button type="button" onClick={yandexLogin}>
      <img src={yandexIcon} alt="yandex" className={styles.yandexLogo} />
      Войти через Яндекс
    </Button>
  )
}

export default OAuth
