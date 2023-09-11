import { Title } from '../../shared/ui'
import styles from './main.module.css'

type IMenuItem = {
  id: number
  text: string
}

const Main = () => {
  const menuItems: IMenuItem[] = [
    {
      id: 1,
      text: 'Option 1',
    },
    {
      id: 2,
      text: 'Option 2',
    },
    {
      id: 3,
      text: 'Option 3',
    },
    {
      id: 4,
      text: 'Option 4',
    },
  ]

  return (
    <div className={styles.mainWrapper}>
      <Title>Battle City</Title>
      <div className={styles.menu}>
        {menuItems.map((item: IMenuItem) => {
          return (
            <div className={styles.menuItem} key={item.id}>
              {item.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Main
