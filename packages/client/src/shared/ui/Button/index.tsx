import React, { ButtonHTMLAttributes, FC } from 'react'

import styles from './button.module.css'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined
}

export const Button: FC<IButton> = ({ children, type, ...rest }) => (
  <button className={styles.button} {...{ type }} {...rest}>
    {children}
  </button>
)
