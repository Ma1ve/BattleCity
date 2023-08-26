import { Formik, Form } from 'formik'

import { Button, Input } from '../../shared/ui'
import H1 from '../../shared/ui/H1'

import styles from './login.module.css'

const Login = () => {
  const initialValues = {
    login: '',
    password: '',
  }

  const onSubmit = (values: Record<string, string>) => {
    console.log(values)
  }

  return (
    <div className={styles.loginPage}>
      <H1>Login</H1>
      <div className={styles.loginWrapper}>
        <Formik {...{ onSubmit, initialValues }}>
          <Form className={styles.loginForm}>
            <div>
              <Input name="login" placeholder="Логин" />
              <Input name="password" type="password" placeholder="Пароль" />
            </div>
            <Button type="submit">Войти</Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Login
