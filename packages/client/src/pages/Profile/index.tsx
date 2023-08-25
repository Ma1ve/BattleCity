import React, { useState } from 'react'
import { ButtonProfile } from '../../shared/ui/'
import ChangePasswordModal from './ChangePasswordModal'
import ChangeAvatarModal from './ChangeAvatarModal'
import { omitObject } from '../../shared/lib'
import H1 from '../../shared/ui/H1'

import avatarStub from './../../shared/images/avatarStub.png'
import styles from './profile.module.css'

import { useAppSelector } from '../../app/hooks/reducer'
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
  const [user] = useAppSelector(state => state.user.userInfo)

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
