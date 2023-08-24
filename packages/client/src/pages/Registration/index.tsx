import { Formik, Form } from 'formik'

import Button from '../../shared/ui/Button'
import H1 from '../../shared/ui/H1'
import Input from '../../shared/ui/Input'

import styles from './registration.module.css'

const Registration = () => {
  const initialValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  }

  const onSubmit = (values: Record<string, string>) => {
    console.log(values)
  }

  return (
    <div className={styles.loginPage}>
      <H1>Registration</H1>
      <div className={styles.loginWrapper}>
        <Formik {...{ onSubmit, initialValues }}>
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
