import styles from './title.module.css'
import classNames from 'classnames'

interface ITitle {
  text: string
  className?: string
}

/** Компонент основного заголовка для разделов. */
const Title = (props: ITitle) => {
  return (
    <div className={classNames(styles.title, props.className)}>
      {props.text}
    </div>
  )
}

export default Title
