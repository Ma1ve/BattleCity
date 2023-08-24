import { Formik, Form } from 'formik'

import Button from '../../shared/ui/Button'
import H1 from '../../shared/ui/H1'
import Input from '../../shared/ui/Input'

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
