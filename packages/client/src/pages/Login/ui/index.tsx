import { Formik, Form } from 'formik'

import { Button, Input, Title } from '../../../shared/ui'

import { validationSchema } from '../libs/validationSchema'

import styles from './login.module.css'

import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../../app/App'
import { AuthAPI } from '../../../shared/api/AuthApi'
import { TLoginData } from '../../../app/models/IUser'
import { UserAPI } from '../../../shared/api/UserApi'

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    login: '',
    password: '',
  }

  const onSubmit = (values: TLoginData) => {
    AuthAPI.login(values)
    UserAPI.getUserData()
    navigate(`/${ERoutes.GAME}`)
  }

  return (
    <div className={styles.loginPage}>
      <Title>Login</Title>
      <div className={styles.loginWrapper}>
        <Formik {...{ onSubmit, initialValues, validationSchema }}>
          <Form>
            <Input name="login" placeholder="Логин" />
            <Input name="password" type="password" placeholder="Пароль" />
            <Button type="submit">Войти</Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login
