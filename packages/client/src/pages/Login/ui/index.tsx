import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'

import { AuthAPI } from '../../../shared/api/AuthApi'
import { TLoginData } from '../../../app/models/IUser'
import { Button, Input, Title } from '../../../shared/ui'
import { validationSchema } from '../libs/validationSchema'
import { useActionCreators } from '../../../app/hooks/reducer'
import { userActions } from '../../../app/store/reducers/UserSlice'
import { ERoutes } from '../../../app/models/types'
import OAuth from '../../../features/ui/OAuth'
import styles from './login.module.css'
import { useState } from 'react'
import Spinner from '../../../shared/ui/Spinner/Spinner'

const Login = () => {
  const actions = useActionCreators(userActions)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const initialValues = {
    login: '',
    password: '',
  }

  const onSubmit = (values: TLoginData) => {
    setIsLoading(true)
    AuthAPI.login(values).then(() =>
      AuthAPI.getUserData().then(response => {
        actions.setUserInfo(response ?? null)
        setIsLoading(false)
        navigate(`/${ERoutes.GAME}`)
      })
    )
  }

  return (
    <div className={styles.loginPage}>
      <Title>Login</Title>
      <div className={styles.loginWrapper}>
        {isLoading ? (
          <div className={styles.loginSpinner}>
            <Spinner />
          </div>
        ) : (
          <Formik {...{ onSubmit, initialValues, validationSchema }}>
            <Form>
              <Input name="login" placeholder="Логин" />
              <Input name="password" type="password" placeholder="Пароль" />
              <Button type="submit">Войти</Button>
              <Button
                type="submit"
                onClick={() => navigate(`/${ERoutes.REGISTRATION}`)}>
                Нет аккаунта?
              </Button>
              <OAuth />
            </Form>
          </Formik>
        )}
      </div>
    </div>
  )
}

export default Login
