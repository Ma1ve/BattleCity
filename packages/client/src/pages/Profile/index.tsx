import React, { useState } from 'react'
import H1 from '../../shared/ui/H1'
import styles from './profile.module.css'
import avatarStub from './../../shared/images/avatarStub.png'

const fakeData: IUserInfo = {
  id: 777,
  first_name: 'Ivan',
  second_name: 'Ivanov',
  display_name: 'Vanya',
  login: 'mylogin',
  avatar: null,
}

interface IUserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: any
}

/** Тип данных для вывода на странцице профиля. */
type TTableUserInfo = Omit<IUserInfo, 'id' | 'avatar'>

const Profile = () => {
  const [user, setUser] = useState<IUserInfo>(fakeData)

  return (
    <div className={styles.profileWrapper}>
      <H1>Profile</H1>
      <div className={styles.profileInfo}>
        <img className={styles.profileAvatar} src={avatarStub} />
        <div className={styles.profileInfoItem}>
          first_name:{' '}
          <span className={styles.profileInfoItemValue}>{user.first_name}</span>
        </div>
        <div className={styles.profileInfoItem}>
          second_name:{' '}
          <span className={styles.profileInfoItemValue}>
            {user.second_name}
          </span>
        </div>
        <div className={styles.profileInfoItem}>
          display_name:{' '}
          <span className={styles.profileInfoItemValue}>
            {user.display_name}
          </span>
        </div>
        <div className={styles.profileInfoItem}>
          login:{' '}
          <span className={styles.profileInfoItemValue}>{user.login}</span>
        </div>
        <button
          className={styles.profileChangePasswordButton}
          onClick={() => console.log('TODO: Модальное окно смены пароля')}>
          Change password
        </button>
      </div>
    </div>
  )
}

export default Profile
