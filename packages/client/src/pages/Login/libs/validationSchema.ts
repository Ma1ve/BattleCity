import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  login: Yup.string()
    .matches(
      /^[(a-zA-Z)|\d|\-|_]+$/,
      'Латиница, цифры без пробелов, знаки - или _'
    )
    .matches(/[a-zA-Z]/, 'Минимум одна латинская буква')
    .min(3, 'Длина не менее 3 символа')
    .max(20, 'Длина должна быть не более 20 символа')
    .required('Поле обязательно'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Хотя бы одна заглаваня буква')
    .matches(/\d/, 'Хотя бы одна цифра')
    .min(8, 'Длина не менее 8 символа')
    .max(40, 'Длина должна быть не более 40 символа')
    .required('Поле обязательно'),
})
