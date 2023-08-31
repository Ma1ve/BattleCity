import React from 'react'
import styles from './title.module.css'
import classNames from 'classnames'

/**
 * Размеры заголовков.
 */
export enum ETitleSize {
  /** 30px */
  SM = 'sm',
  /** 50px */
  MD = 'md',
  /** 80px */
  LG = 'lg',
}

interface IH1 {
  children: React.ReactNode
  className?: string
  size?: ETitleSize
}

/** Компонент основного заголовка для разделов. */
export const Title = ({ children, className, size }: IH1) => {
  const titleClass = classNames(styles.title, {
    [styles.titleSM]: size === ETitleSize.SM || !size,
    [styles.titleMD]: size === ETitleSize.MD,
    [styles.titleLG]: size === ETitleSize.LG,
  })
  return <div className={`${titleClass} ${className}`}>{children}</div>
}
