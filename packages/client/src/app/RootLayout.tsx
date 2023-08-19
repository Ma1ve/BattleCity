import { Outlet, NavLink } from 'react-router-dom'
import { ERoutes } from './App'
import styles from './styles/rootLayout.module.css'

const RootLayout = () => {
  console.log(location.pathname)
  return (
    <div className={styles.wrapperLayout}>
      <header className={styles.headerLayout}>
        Tanks 1.0
        <menu className={`${styles.menuLayout}`}>
          <NavLink
            to={ERoutes.INDEX}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            main
          </NavLink>
          <NavLink
            to={ERoutes.LOGIN}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            login
          </NavLink>
          <NavLink
            to={ERoutes.REGISTRATION}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            registration
          </NavLink>
          <NavLink
            to={ERoutes.PROFILE}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            profile
          </NavLink>
          <NavLink
            to={ERoutes.GAME}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            game
          </NavLink>
          <NavLink
            to={ERoutes.LEADERBOARD}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            leaderboard
          </NavLink>
          <NavLink
            to={ERoutes.FORUM}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            forum
          </NavLink>
          <NavLink
            to={ERoutes.TOPIC}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            topic
          </NavLink>
          <NavLink
            to={ERoutes.ERROR400}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            page400
          </NavLink>
          <NavLink
            to={ERoutes.ERROR404}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            page404
          </NavLink>
          <NavLink
            to={ERoutes.ERROR500}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }>
            page500
          </NavLink>
        </menu>
      </header>
      <main className={styles.mainLayout}>
        <Outlet />
      </main>
      <footer className={styles.footerLayout}>
        V.E.I.S.A development &#169;
      </footer>
    </div>
  )
}

export default RootLayout
