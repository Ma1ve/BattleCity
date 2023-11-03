import React from 'react'
import { NavLink } from 'react-router-dom'
import { useActionCreators, useAppSelector } from '../../../app/hooks/reducer'

import { ERoutes, Theme } from '../../../app/models/types'
import {
  selectUserTheme,
  userActions,
} from '../../../app/store/reducers/UserSlice'
import themeIcon from '../../../shared/images/theme.svg'
import styles from './Header.module.css'

const Header = () => {
  const theme = useAppSelector(selectUserTheme)
  const actions = useActionCreators(userActions)

  const changeTheme = () => {
    actions.setTheme({
      theme: `${theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}`,
    })
  }

  return (
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
        <img
          alt="Changed theme"
          src={themeIcon}
          className={styles.changeTheme}
          onClick={changeTheme}
          title="Сменить тему"
        />
      </menu>
    </header>
  )
}

export default Header
