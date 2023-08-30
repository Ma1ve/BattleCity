import React from 'react'
import { useField } from 'formik'

import styles from './input.module.css'

interface IInput {
  name: string
  label?: string
  type?: string
  placeholder?: string
}

export const Input = (props: IInput): JSX.Element => {
  const { type, name, label, ...rest } = props

  const [field, { error, touched }] = useField(props)

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <span className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={type || 'text'}
          id={name}
          onKeyDown={handleKeyDown}
          {...field}
          {...rest}
        />
        {touched && error ? (
          <span className={styles.error}>{error}</span>
        ) : null}
      </span>
    </div>
  )
}
