import { Formik, Form } from 'formik'

import { Button, Input, H1 } from '../../../shared/ui'

import { validationSchema } from '../libs/validationSchema'

import styles from './login.module.css'

import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    login: '',
    password: '',
  }

  const onSubmit = (values: Record<string, string>) => {
    console.log(values)
    navigate('/game')
  }

  return (
    <div className={styles.loginPage}>
      <H1>Login</H1>
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
