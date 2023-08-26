import React, { MouseEvent } from 'react'
import styles from './modal.module.css'

/**
 * @prop width Ширина модального окна (от 300px до 800px).
 * @prop title Заголовок.
 * @prop children Дочерние элементы.
 * @prop close Обраотчик закрытия модального окна.
 */
interface IModal {
  width: string | number
  title?: string
  children: React.ReactNode
  close: () => void
}

/** Компонент модального окна. */
export const Modal = (props: IModal) => {
  return (
    <div onClick={props.close} className={styles.overlay}>
      <div
        className={styles.modalWrapper}
        style={{ width: props.width }}
        onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeaderWrapper}>
          <div className={styles.modalTitle}>{props.title}</div>
          <span
            onClick={props.close}
            className={styles.modalCloseButton}></span>
        </div>
        {props.children}
      </div>
    </div>
  )
}
