import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Auth from '../features/ui/Auth'
import Footer from '../entities/ui/Footer/Footer'
import Header from '../entities/ui/Header/Header'
import { useAppSelector } from './hooks/reducer'
import { selectUserInfo } from './store/reducers/UserSlice'
import styles from './styles/rootLayout.module.css'

interface IRootLayout {
  children?: React.ReactElement
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  const userInfo = useAppSelector(selectUserInfo)

  return (
    <div className={styles.wrapperLayout}>
      <Header />
      <main className={styles.mainLayout}>
        <Auth {...{ userInfo }}>{children ?? <Outlet />}</Auth>
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
