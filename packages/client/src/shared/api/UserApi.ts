import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from './consts'

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
      console.log(response)
      return response
    } catch (error: any) {
      console.error('error: ', error?.response?.data)
      // TODO: обработка ошибок handleError(error.response?.data).
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
      console.log(response)
      return response
    } catch (error: any) {
      console.error('error: ', error?.response?.data)
      // TODO: обработка ошибок handleError(error.response?.data).
    }
  }
}

export const UserAPI = new UserApi()
