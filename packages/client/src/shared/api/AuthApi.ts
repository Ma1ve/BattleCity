import axios, { AxiosInstance } from 'axios'
import { TUserRegistrationData, TLoginData } from '../../app/models/IUser'
import { AUTH_URL } from './consts'

class AuthApi {
  private instance: AxiosInstance

  protected createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: AUTH_URL,
      responseType: 'json',
      timeout: 5 * 1000,
    })
  }

  constructor() {
    this.instance = this.createAxiosInstance()
  }

  signup = async (data: TUserRegistrationData) => {
    try {
      const response = await this.instance.post(`signup`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      return response
    } catch (error: any) {
      console.error('error: ', error?.response?.data)
    }
  }

  login = async (data: TLoginData) => {
    try {
      const response = await this.instance.post(`signin`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      return response
    } catch (error: any) {
      console.error('error: ', error?.response?.data)
    }
  }
}

export const AuthAPI = new AuthApi()
