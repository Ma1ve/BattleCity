import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { TUserRegistrationData, TLoginData } from '../../app/models/IUser'
import { AUTH_URL } from './consts'

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
      toast.success(JSON.stringify(response?.data))
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason)
    }
  }

  login = async (data: TLoginData) => {
    try {
      const response = await this.instance.post(`signin`, data)
      toast.success(JSON.stringify(response?.data))
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason)
    }
  }

  logout = async () => {
    try {
      const response = await this.instance.post(`logout`)
      toast.success(JSON.stringify(response?.data))
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  getUserData = async () => {
    try {
      const response = await this.instance.get(`user`)
      toast.success(JSON.stringify(response?.data))
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }
}

export const AuthAPI = new AuthApi()
