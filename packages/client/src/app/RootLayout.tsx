import { Outlet, Link } from 'react-router-dom'
import { ERoutes } from './App'
import styles from './styles/rootLayout.module.css'

const RootLayout = () => {
  return (
    <main className={styles.mainLayout}>
      <header className={styles.headerLayout}>
        Tanks 1.0
        <menu className={styles.menuLayout}>
          <Link to={ERoutes.INDEX}>main</Link>
          <Link to={ERoutes.LOGIN}>login</Link>
          <Link to={ERoutes.REGISTRATION}>registration</Link>
          <Link to={ERoutes.PROFILE}>profile</Link>
          <Link to={ERoutes.GAME}>game</Link>
          <Link to={ERoutes.LEADERBOARD}>leaderboard</Link>
          <Link to={ERoutes.FORUM}>forum</Link>
          <Link to={ERoutes.TOPIC}>topic</Link>
          <Link to={ERoutes.ERROR404}>page404</Link>
          <Link to={ERoutes.ERROR500}>page500</Link>
        </menu>
      </header>
      <Outlet />
      <footer className={styles.footerLayout}>
        V.E.I.S.A development &#169;
      </footer>
    </main>
  )
}

export default RootLayout
