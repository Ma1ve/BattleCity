import React, { useState } from 'react'
import { ButtonProfile, H1 } from '../../shared/ui/'
import ChangePasswordModal from './ChangePasswordModal'
import ChangeAvatarModal from './ChangeAvatarModal'
import { omitObject } from '../../shared/lib'
import avatarStub from './../../shared/images/avatarStub.png'
import styles from './profile.module.css'

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

/** Тип данных для вывода на странице профиля. */
type TDisplayUserInfo = Omit<IUserInfo, 'id' | 'avatar'>

const Profile = () => {
  const [user, setUser] = useState<IUserInfo>(fakeData)

  /** Признак открытия модального окна смены аватара. */
  const [showChangeAvatarModal, setShowChangeAvatarModal] =
    useState<boolean>(false)

  /** Признак открытия модального окна смены пароля. */
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false)

  return (
    <div className={styles.profileWrapper}>
      <H1>Profile</H1>
      <div className={styles.profileInfo}>
        <img
          className={styles.profileAvatar}
          src={user.avatar || avatarStub}
          onClick={() => setShowChangeAvatarModal(!showChangeAvatarModal)}
          alt="Change avatar"
        />
        {Object.entries(
          omitObject(user, ['id', 'avatar']) as TDisplayUserInfo
        ).map((val, i) => {
          return (
            <div className={styles.profileInfoItem} key={i}>
              {val[0] + ': '}
              <span className={styles.profileInfoItemValue}>{val[1]}</span>
            </div>
          )
        })}
        <ButtonProfile
          onClick={() => setShowChangePasswordModal(!showChangePasswordModal)}>
          Change password
        </ButtonProfile>
      </div>
      {showChangeAvatarModal && (
        <ChangeAvatarModal onClose={() => setShowChangeAvatarModal(false)} />
      )}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
    </div>
  )
}

export default Profile
