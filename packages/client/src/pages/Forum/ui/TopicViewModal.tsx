import { useState, useEffect } from 'react'
import { Button, Input, Modal } from '../../../shared/ui'
import {
  ForumAPI,
  ITopic,
  IComment,
  ITopicCreate,
} from '../../../shared/api/ForumApi'
import { Comment } from './Comment'
import { toast } from 'react-toastify'
import styles from './topicViewModal.module.css'
import { Formik, Form } from 'formik'
import { useAppSelector } from '../../../app/hooks/reducer'
import { TUserProfileData } from '../../../app/models/IUser'
import { selectUserInfo } from '../../../app/store/reducers/UserSlice'

/**
 * @prop onClose Обработчик закрытия модального окна.
 */
interface ITopicViewModal {
  onClose: () => void
}

type ITopicViewModalProps = ITopicViewModal & ITopic

const stubValue: IComment[] = []

type TNewCommentValues = Pick<ITopicCreate, 'content'>

/** Компонент модального окна топика. */
export const TopicViewModal = ({
  onClose,
  title,
  id,
}: ITopicViewModalProps) => {
  const stubDataComment = {
    id: -1,
    content: 'Тут будут ваши сообщения: Пожалуйста напишите что-то ',
    author: 'Admin',
    topicId: -1,
    createdAt: 'null',
    updatedAt: 'null',
  }

  const [comments, setComments] = useState<IComment[]>(stubValue)

  const getComments = async () => {
    try {
      const res = await ForumAPI.getAllComments({ topicId: id as string })
      setComments([...stubValue, ...(res?.data || [])])
    } catch (e: any) {
      toast.error(e?.response?.data?.reason)
      setComments(stubValue)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const user = useAppSelector<TUserProfileData>(selectUserInfo)

  const initialValues: TNewCommentValues = {
    content: '',
  }

  const onSubmit = async (
    { content }: TNewCommentValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await ForumAPI.createComment({
        topicId: id,
        content,
        author: user?.first_name,
      } as {
        topicId: string
        content: string
        author: string
      })
      resetForm()
      getComments()
    } catch (e: any) {
      toast.error(e?.response?.data?.reason)
    }
  }

  return (
    <Modal close={onClose} width={640} title={title}>
      <div className={styles.topicViewModalWrapper}>
        {comments.length !== 0 ? (
          comments?.map(comment => {
            return <Comment data={comment} />
          })
        ) : (
          <Comment data={stubDataComment} />
        )}
      </div>
      <Formik {...{ onSubmit, initialValues }}>
        <Form className={styles.inputWrapperForm}>
          <Input
            name="content"
            placeholder="Enter the text...."
            isEmoji={true}
          />
          <Button type="submit">Send</Button>
        </Form>
      </Formik>
    </Modal>
  )
}
