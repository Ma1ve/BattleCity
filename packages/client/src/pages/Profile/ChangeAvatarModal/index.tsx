import React, { useState, ChangeEvent } from 'react'
import { Modal, Button } from './../../../shared/ui'
import { UserActionsApi } from '../../../shared/api/UserActionsApi'
import avatarStub from './../../../shared/images/avatarStub.png'
import styles from './changeAvatarModal.module.css'

/**
 * @prop onClose Обработчик закрытия модального окна.
 */
interface IChangeAvatardModal {
  onClose: () => void
}

/** Компонент модального окна смены аватара. */
const ChangeAvatarModal = ({ onClose }: IChangeAvatardModal) => {
  const [file, setFile] = useState<File>()

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('file', e.target.files)
      setFile(e.target.files[0])
    }
  }

  const handleSubmitAvatar = () => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('avatar', file, file.name)

    UserActionsApi.changeAvatar(formData)

    onClose()
  }

  return (
    <Modal close={onClose} width={500} title="Change avatar">
      <div className={styles.changeAvatarModalBody}>
        <img
          className={styles.changeAvatarImage}
          src={(file && URL.createObjectURL(file)) || avatarStub}
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
