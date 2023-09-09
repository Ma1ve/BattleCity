import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

import { AUTH_URL, BASE_URL } from './consts'

class UserApi {
  private instance: AxiosInstance

  protected createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
      responseType: 'json',
      timeout: 5 * 1000,
    })
  }

  constructor() {
    this.instance = this.createAxiosInstance()
  }

  /** Смена пароля
   * @param oldPassword
   * @param newPassword
   */
  changePassword = async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string
    newPassword: string
  }) => {
    try {
      const response = await this.instance.put(
        `user/password`,
        { oldPassword, newPassword },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.success(response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  /** Смена аватара
   * @param data
   */
  changeAvatar = async (data: FormData) => {
    try {
      const response = await this.instance.put(
        `user/profile/avatar`,
        { data },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      toast.success(response?.data, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  getUserData = async () => {
    try {
      const response = await axios.get(`${AUTH_URL}/user`, {
        headers: { 'Content-Type': 'application/json' },
      })
      return response
    } catch (error: any) {
      toast.error(error?.response?.data?.reason, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }
}

export const UserAPI = new UserApi()
