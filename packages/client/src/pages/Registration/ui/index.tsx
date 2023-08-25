import { Formik, Form } from 'formik'

import { Button, Input, H1 } from '../../../shared/ui'

import { validationSchema } from '../libs/validationSchema'

import styles from './registration.module.css'

import { getUserInfo } from '../../app/store/reducers/UserSlice'
import { useAppDispatch } from '../../app/hooks/reducer'
import { useNavigate } from 'react-router-dom'

import { TUserProfileData, TUserRegistrationData } from '../../app/models/IUser'

const Registration = () => {
  const dispatch = useAppDispatch()

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
    console.log(values)
    // Тут мы должны отправить data - values на сервер
    // Тут value уже выступает в виде data которая пришла нам с сервера поэтому она должна быть типа IUser
    dispatch(getUserInfo(values as unknown as TUserProfileData))
    navigate('/profile')
  }

  return (
    <div className={styles.registrationPage}>
      <H1>Registration</H1>
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
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Registration
