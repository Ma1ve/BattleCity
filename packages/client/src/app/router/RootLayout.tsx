import { FC, useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Auth from '../../features/ui/Auth'
import Footer from '../../entities/ui/Footer/Footer'
import Header from '../../entities/ui/Header/Header'

import { useActionCreators, useAppSelector } from '../hooks/reducer'
import { selectUserInfo, userActions } from '../store/reducers/UserSlice'
import { FullscreenButton } from '../../features/ui/FullscreenButton'
import { AuthAPI } from '../../shared/api/AuthApi'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from '../styles/rootLayout.module.css'
import '../styles/index.css'

import { BackgroundAudioArea } from '../../features/ui/BackgroundAudioArea'
// import { redirectUri } from '../../shared/api/consts'

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

  const userInfo = useAppSelector(selectUserInfo)
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

  useEffect(() => {
    if (authCode) {
      OAuth(authCode)
    }
  }, [authCode, OAuth])

  useEffect(() => {
    auth()
  }, [auth])

  // const userInfo = useAppSelector(selectUserInfo)
  // const actions = useActionCreators(userActions)
  // const authCode = new URLSearchParams(window.location.search).get('code')

  // const OAuth = useCallback(async (code: string) => {
  //   await AuthAPI.sendAuthCode(code, redirectUri)
  //   auth()
  // }, [])

  // const auth = useCallback(async () => {
  //   const userData = await AuthAPI.getUserData()
  //   actions.setUserInfo(userData ?? null)
  // }, [])

  // useEffect(() => {
  //   if (authCode) {
  //     OAuth(authCode)
  //   }
  // }, [authCode])

  // useEffect(() => {
  //   auth()
  // }, [])

  return (
    <div className={styles.wrapperLayout}>
      <Header />
      <main className={styles.mainLayout}>
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
