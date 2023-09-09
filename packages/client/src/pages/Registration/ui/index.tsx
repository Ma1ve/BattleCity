import { Formik, Form } from 'formik'

import { Button, Input, Title } from '../../../shared/ui'

import { validationSchema } from '../libs/validationSchema'

import styles from './registration.module.css'

import { useActionCreators } from '../../../app/hooks/reducer'
import { useNavigate } from 'react-router-dom'

import { TUserRegistrationData } from '../../../app/models/IUser'
import { userActions } from '../../../app/store/reducers/UserSlice'
import { AuthAPI } from '../../../shared/api/AuthApi'
import { ERoutes } from '../../../app/models/types'

const Registration = () => {
  const actions = useActionCreators(userActions)

  const navigate = useNavigate()

  const initialValues: TUserRegistrationData = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  }

  const onSubmit = (values: TUserRegistrationData) => {
    AuthAPI.signup(values).then(response =>
      actions.setUserInfo(response as any)
    )
    navigate(`/${ERoutes.PROFILE}`)
  }

  return (
    <div className={styles.registrationPage}>
      <Title>Registration</Title>
      <div className={styles.registrationWrapper}>
        <Formik {...{ onSubmit, initialValues, validationSchema }}>
          <Form>
            <Input name="first_name" placeholder="Имя" />
            <Input name="second_name" placeholder="Фамилия" />
            <Input name="login" placeholder="Логин" />
            <Input name="email" placeholder="Почта" />
            <Input name="password" type="password" placeholder="Пароль" />
            <Input name="phone" placeholder="Телефон" />
            <Button type="submit">Зарегистрироваться</Button>
            <Button type="submit" onClick={() => navigate(`/${ERoutes.LOGIN}`)}>
              Уже есть аккаунт
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Registration
