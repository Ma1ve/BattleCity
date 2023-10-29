import { useNavigate } from 'react-router-dom'
import { Title } from '../../shared/ui'
import styles from './main.module.css'
import { useActionCreators } from '../../app/hooks/reducer'
import { userActions } from '../../app/store/reducers/UserSlice'

type IMenuItem = {
  id: number
  text: string
}

const Main = () => {
  const actions = useActionCreators(userActions)

  const navigate = useNavigate()

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
  ]

  return (
    <div className={styles.mainWrapper}>
      <Title>Battle City</Title>
      <div className={styles.menu}>
        {menuItems.map((item: IMenuItem) => {
          return (
            <div
              onClick={() => {
                actions.setLevel({ level: item.id })
                navigate('/game')
              }}
              className={styles.menuItem}
              key={item.id}>
              {item.text}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Main
