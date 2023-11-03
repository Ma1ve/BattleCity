import React, { useRef, useState } from 'react'
import { useField } from 'formik'

import styles from './input.module.css'
import { EmojiButton } from '../../../components/EmojiButton/EmojiButton'

interface IInput {
  name: string
  label?: string
  type?: string
  placeholder?: string
}

export const Input = (props: IInput): JSX.Element => {
  const { type, name, label, ...rest } = props

  const [field, { error, touched }] = useField(props)
  const [caretPosition, setCaretPosition] = useState<number>(0)
  const inputRef = useRef(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  const onSelectEmoji = (code: string) => {
    const value =
      field.value.slice(0, caretPosition) +
      code +
      field.value.slice(caretPosition)
    field.onChange({
      target: {
        name: name,
        value: value,
      },
    })
    setTimeout(() => {
      if (inputRef.current) {
        const position = (inputRef.current as HTMLInputElement).selectionStart
        if (position) {
          setCaretPosition(position)
        }
      }
    }, 0)
  }

  const setPosition = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement
    const position = target.selectionStart
    if (position) setCaretPosition(position)
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <span className={styles.inputWrapper}>
        <div className={styles.inputLine}>
          <input
            className={styles.input}
            type={type || 'text'}
            id={name}
            onKeyDown={handleKeyDown}
            {...field}
            {...rest}
            onClick={setPosition}
            onKeyUp={setPosition}
            ref={inputRef}
          />
          <EmojiButton onSelectEmoji={onSelectEmoji} />
        </div>
        {touched && error ? (
          <span className={styles.error}>{error}</span>
        ) : null}
      </span>
    </div>
  )
}
