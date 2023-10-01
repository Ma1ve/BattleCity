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

const Login = () => {
  const actions = useActionCreators(userActions)

  const navigate = useNavigate()

  const initialValues = {
    login: '',
    password: '',
  }

  const onSubmit = (values: TLoginData) => {
    AuthAPI.login(values).then(() =>
      AuthAPI.getUserData().then(response => {
        actions.setUserInfo(response as any)
        navigate(`/${ERoutes.GAME}`)
      })
    )
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
            <Button
              type="submit"
              onClick={() => navigate(`/${ERoutes.REGISTRATION}`)}>
              Нет аккаунта?
            </Button>
            <OAuth />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login
