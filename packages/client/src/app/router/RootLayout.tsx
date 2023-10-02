import { FC, useEffect } from 'react'
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

interface IRootLayout {
  children?: React.ReactElement
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  const userInfo = useAppSelector(selectUserInfo)

  const actions = useActionCreators(userActions)

  useEffect(() => {
    AuthAPI.getUserData().then(response => actions.setUserInfo(response as any))
  }, [])

  return (
    <div className={styles.wrapperLayout}>
      <Header />
      <main className={styles.mainLayout}>
        <Auth {...{ userInfo }}>{children ?? <Outlet />}</Auth>
      </main>
      <Footer />
      <ToastContainer theme="dark" position="bottom-right" autoClose={5000} />
      <FullscreenButton />
    </div>
  )
}

export default RootLayout
