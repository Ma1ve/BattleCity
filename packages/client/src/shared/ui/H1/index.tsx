import React from 'react'
import styles from './h1.module.css'

interface IH1 {
  children: React.ReactNode
}

/** Компонент основного заголовка для разделов. */
export const H1 = (props: IH1) => {
  return <div className={styles.title}>{props.children}</div>
}

export default H1
