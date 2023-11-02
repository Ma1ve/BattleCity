import React, { useState, ChangeEvent } from 'react'
import { Modal, Button } from './../../../shared/ui'
import { UserAPI } from '../../../shared/api/UserApi'
import avatarStub from './../../../shared/images/avatarStub.png'
import styles from './changeAvatarModal.module.css'
import { useActionCreators, useAppSelector } from '../../../app/hooks/reducer'
import {
  selectUserInfo,
  userActions,
} from '../../../app/store/reducers/UserSlice'
import { IUser } from '../../../app/models/IUser'

/**
 * @prop onClose Обработчик закрытия модального окна.
 */
interface IChangeAvatardModal {
  onClose: () => void
}

/** Компонент модального окна смены аватара. */
const ChangeAvatarModal = ({ onClose }: IChangeAvatardModal) => {
  const user: IUser | null = useAppSelector(selectUserInfo)

  const [file, setFile] = useState<File>()

  const actions = useActionCreators(userActions)

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmitAvatar = async () => {
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('avatar', file, file.name)

    const userData = await UserAPI.changeAvatar(formData)

    actions.setUserInfo(userData ?? null)

    onClose()
  }

  return (
    <Modal close={onClose} width={500} title="Change avatar">
      <div className={styles.changeAvatarModalBody}>
        <img
          className={styles.changeAvatarImage}
          src={
            user?.avatar
              ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
              : avatarStub
          }
          alt="Change avatar"
        />
        <label className={styles.changeAvatarLabel}>
          <input
            onChange={handleChangeAvatar}
            className={styles.changeAvatarInput}
            type="file"
          />
          {file ? `${file.name}` : 'Select file...'}
        </label>

        {file && (
          <Button type="button" onClick={handleSubmitAvatar}>
            Confirm
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default ChangeAvatarModal
