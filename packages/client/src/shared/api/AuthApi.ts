import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
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
      toast.success(response.data.id, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  login = async (data: TLoginData) => {
    try {
      const response = await this.instance.post(`signin`, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      toast.success(response.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  logout = async () => {
    try {
      const response = await this.instance.post(`logout`)
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }
}

export const AuthAPI = new AuthApi()
