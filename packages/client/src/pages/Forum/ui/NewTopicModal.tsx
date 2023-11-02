import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Modal, Button, Input } from './../../../shared/ui'
import { ForumAPI, ITopicCreate } from '../../../shared/api/ForumApi'
import { TUserProfileData } from '../../../app/models/IUser'
import { toast } from 'react-toastify'
import { selectUserInfo } from '../../../app/store/reducers/UserSlice'
import { useAppSelector } from '../../../app/hooks/reducer'

import styles from './newTopicModal.module.css'

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Поле обязательно')
    .min(8, 'Длина не менее 8 символа')
    .max(20, 'Длина должна быть не более 20 символа'),
})

type TNewTopicValues = Pick<ITopicCreate, 'title'>

/**
 * @prop onClose Обработчик закрытия модального окна.
 * @prop onReload Обработчик обновления списка тем.
 */
interface INewTopicModalProps {
  onClose: () => void
  onReload: () => void
}

/** Компонент модалки создания нового топика. */
export const NewTopicModal = ({ onClose, onReload }: INewTopicModalProps) => {
  const initialValues: TNewTopicValues = {
    title: '',
  }

  const user = useAppSelector<TUserProfileData>(selectUserInfo)

  const onSubmit = async ({ title }: TNewTopicValues) => {
    try {
      await ForumAPI.createTopic({
        title,
        author: user?.first_name,
        content: title,
      } as {
        title: string
        author: string
        content: string
      })

      onReload()
      onClose()
    } catch (e: any) {
      toast.error(e?.response?.data?.reason)
    }
  }

  return (
    <Modal close={onClose} width={640} title={'New topic'}>
      <Formik {...{ onSubmit, initialValues, validationSchema }}>
        <Form className={styles.wrapperInputTopic}>
          <Input name="title" placeholder="Title" />
          <Button type="submit">Confirm</Button>
        </Form>
      </Formik>
    </Modal>
  )
}
