import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ButtonProfile, Title } from '../../shared/ui/'
import ChangePasswordModal from './ChangePasswordModal'
import ChangeAvatarModal from './ChangeAvatarModal'
import { omitObject } from '../../shared/lib'
import { selectUserInfo, userActions } from '../../app/store/reducers/UserSlice'
import { AuthAPI } from '../../shared/api/AuthApi'
import { ERoutes } from '../../app/models/types'
import { useActionCreators, useAppSelector } from '../../app/hooks/reducer'
import avatarStub from './../../shared/images/avatarStub.png'
import styles from './profile.module.css'

interface IUserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  phone: string
  email: string
}

/** Тип данных для вывода на странице профиля. */
type TDisplayUserInfo = Omit<IUserInfo, 'id' | 'avatar'>

const Profile = () => {
  const user = useAppSelector(selectUserInfo)
  const actions = useActionCreators(userActions)
  const navigate = useNavigate()

  const logout = () => {
    AuthAPI.logout().then(() => actions.setUserInfo(null))
    navigate(`/${ERoutes.LOGIN}`)
  }

  /** Признак открытия модального окна смены аватара. */
  const [showChangeAvatarModal, setShowChangeAvatarModal] =
    useState<boolean>(false)

  /** Признак открытия модального окна смены пароля. */
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false)

  return (
    <div className={styles.profileWrapper}>
      <Title>Profile</Title>
      {user && (
        <div className={styles.profileInfo}>
          <img
            className={styles.profileAvatar}
            src={
              `https://ya-praktikum.tech/api/v2/resources/${user.avatar}` ||
              avatarStub
            }
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
            onClick={() =>
              setShowChangePasswordModal(!showChangePasswordModal)
            }>
            Change password
          </ButtonProfile>
          <ButtonProfile onClick={logout}>Logout</ButtonProfile>
        </div>
      )}
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
