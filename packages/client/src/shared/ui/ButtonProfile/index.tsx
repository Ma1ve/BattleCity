import React from 'react'
import styles from './buttonProfile.module.css'

/**
 * @prop children Дочерние элементы.
 * @prop close Обработчик клика на конпку.
 */
interface IButtonProfile {
  children: React.ReactNode
  onClick: () => void
}

/** Компонент кнопки. */
export const ButtonProfile = (props: IButtonProfile) => {
  return (
    <button
      className={styles.profileChangePasswordButton}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}
