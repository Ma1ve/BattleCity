import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Modal, Button, Input } from './../../../shared/ui'
import { UserActionsApi } from '../../../shared/api/UserActionsApi'
import styles from './changePasswordModal.module.css'

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(/[A-Z]/, 'Хотя бы одна заглаваня буква')
    .matches(/\d/, 'Хотя бы одна цифра')
    .min(8, 'Длина не менее 8 символа')
    .max(40, 'Длина должна быть не более 40 символа')
    .required('Поле обязательно'),
  newPasswordRepeat: Yup.string()
    .matches(/[A-Z]/, 'Хотя бы одна заглаваня буква')
    .matches(/\d/, 'Хотя бы одна цифра')
    .min(8, 'Длина не менее 8 символа')
    .max(40, 'Длина должна быть не более 40 символа')
    .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают')
    .required('Поле обязательно'),
})

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
    UserActionsApi.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })

    onClose()
  }

  return (
    <Modal close={onClose} width={500} title="Change password">
      <div className={styles.changePasswordModalBody}>
        <Formik {...{ onSubmit, initialValues, validationSchema }}>
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
