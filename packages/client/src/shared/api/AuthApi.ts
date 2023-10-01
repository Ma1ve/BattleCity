import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import {
  TUserRegistrationData,
  TLoginData,
  TUserProfileData,
} from '../../app/models/IUser'
import { AUTH_URL, OAUTH_URL } from './consts'

class AuthApi {
  private instance: AxiosInstance

  protected createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: AUTH_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'json',
      timeout: 5 * 1000,
    })
  }

  constructor() {
    this.instance = this.createAxiosInstance()
  }

  signup = async (data: TUserRegistrationData) => {
    try {
      const response = await this.instance.post(`signup`, data)
      toast.success('Пользователь зарегистрирован')
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason)
    }
  }

  login = async (data: TLoginData) => {
    try {
      const response = await this.instance.post(`signin`, data)
      toast.success('Вход выполнен')
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason)
    }
  }

  logout = async () => {
    try {
      const response = await this.instance.post(`logout`)
      toast.warning('Выполнен выход из профиля')
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason)
    }
  }

  getUserData = async (): Promise<{ data: TUserProfileData } | undefined> => {
    try {
      const response = await this.instance.get(`user`)
      toast.success('Данные профиля получены')
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
    }
  }

  getServiceId = async (redirectUri: string) => {
    try {
      const response = await this.instance.get(
        `${OAUTH_URL}/service-id?redirect_uri=${redirectUri}`
      )
      return response.data.service_id
    } catch (error: unknown) {
      toast.error(`Ошибка при получении service_id`)
    }
  }

  sendAuthCode = async (code: string, redirect_uri: string) => {
    try {
      const data = JSON.stringify({
        code,
        redirect_uri,
      })
      const response = await this.instance.post(`${OAUTH_URL}`, data)
      return response
    } catch (error: unknown) {
      toast.error(`Ошибка при отправке кода авторизации`)
    }
  }
}

export const AuthAPI = new AuthApi()
