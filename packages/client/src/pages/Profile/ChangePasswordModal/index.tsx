import React from 'react'
import { Formik, Form } from 'formik'
import { Modal, Button, Input } from './../../../shared/ui'
import { UserActionsApi } from '../../../shared/api/UserActionsApi'
import styles from './changePasswordModal.module.css'

type TNewPassword = {
  oldPassword: string
  newPassword: string
  newPasswordRepeat: string
}

/**
 * @prop onClose Обработчик закрытия модального окна.
 */
interface IChangePasswordModal {
  onClose: () => void
}

/** Компонент модального окна смены пароля. */
const ChangePasswordModal = ({ onClose }: IChangePasswordModal) => {
  const initialValues: TNewPassword = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  }

  const onSubmit = (values: TNewPassword) => {
    // TODO: добавить валидацию yup.
    if (
      values.oldPassword &&
      values.newPassword.length >= 8 &&
      values.newPassword === values.newPasswordRepeat
    ) {
      console.log(values)

      UserActionsApi.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })

      onClose()
    }
  }

  return (
    <Modal close={onClose} width={500} title="Change password">
      <div className={styles.changePasswordModalBody}>
        <Formik {...{ onSubmit, initialValues }}>
          <Form className={styles.changePasswordForm}>
            <Input name="oldPassword" placeholder="Old password" />
            <Input
              name="newPassword"
              type="password"
              placeholder="New password"
            />
            <Input
              name="newPasswordRepeat"
              type="password"
              placeholder="New password repeat"
            />
            <Button type="submit">Confirm</Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}

export default ChangePasswordModal
