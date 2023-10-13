import { FC, useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import classNames from 'classnames'
import { ToastContainer } from 'react-toastify'

import Auth from '../../features/ui/Auth'
import Footer from '../../entities/ui/Footer/Footer'
import Header from '../../entities/ui/Header/Header'
import { useActionCreators, useAppSelector } from '../hooks/reducer'
import {
  selectUserInfo,
  selectUserTheme,
  userActions,
} from '../store/reducers/UserSlice'
import { FullscreenButton } from '../../features/ui/FullscreenButton'
import { AuthAPI } from '../../shared/api/AuthApi'
import { BackgroundAudioArea } from '../../features/ui/BackgroundAudioArea'
import { TUserProfileData } from '../models/IUser'
import { ETheme } from '../models/types'
import '../styles/index.css'
import styles from '../styles/rootLayout.module.css'

interface IRootLayout {
  children?: React.ReactElement
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  const [redirectUri, setRedirectUri] = useState<string | null>(null)

  useEffect(() => {
    if (!initialized) {
      if (typeof window !== 'undefined') {
        const newRedirectUri = window.location.origin
        setInitialized(true)
        setRedirectUri(newRedirectUri)
      }
    }
  }, [initialized])

  const theme: string = useAppSelector(selectUserTheme)
  const userInfo: TUserProfileData = useAppSelector(selectUserInfo)
  const actions = useActionCreators(userActions)
  const authCode =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('code')
      : null

  const OAuth = useCallback(
    async (code: string) => {
      await AuthAPI.sendAuthCode(code, redirectUri)
      auth()
    },
    [redirectUri]
  )

  const auth = useCallback(async () => {
    const userData = await AuthAPI.getUserData()
    actions.setUserInfo(userData ?? null)
  }, [])

  const getTheme = useCallback(async () => {
    if (userInfo) {
      const currentTheme = await AuthAPI.getTheme(userInfo.id)
      actions.setTheme(currentTheme?.data)
    }
  }, [])

  useEffect(() => {
    if (authCode) {
      OAuth(authCode)
    }
  }, [authCode, OAuth])

  useEffect(() => {
    auth()
  }, [auth])

  useEffect(() => {
    getTheme()
  }, [userInfo])

  useEffect(() => {
    if (userInfo) {
      AuthAPI.setTheme(userInfo.id, theme)
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <div className={styles.wrapperLayout}>
      <Header />
      <main
        className={classNames(styles.mainLayout, {
          [styles.dark]: theme === ETheme.DARK,
          [styles.light]: theme === ETheme.LIGHT,
        })}>
        <Auth {...{ userInfo }}>{children ?? <Outlet />}</Auth>
      </main>
      <Footer />
      <BackgroundAudioArea />
      <ToastContainer theme="dark" position="bottom-right" autoClose={5000} />
      <FullscreenButton />
    </div>
  )
}

export default RootLayout
