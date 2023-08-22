import React, { FC } from 'react'

import styles from './button.module.css'

interface IButton {
  type: 'button' | 'submit' | 'reset' | undefined
  children: React.ReactNode
}

const Button: FC<IButton> = ({ children, type, ...rest }) => (
  <button className={styles.button} {...{ type }} {...rest}>
    {children}
  </button>
)

export default Button
