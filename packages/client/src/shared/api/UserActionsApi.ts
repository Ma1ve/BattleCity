// TODO: вынести в константы.
export const API_URL = 'https://ya-praktikum.tech/api/v2'
export const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources'

class UserApi {
  /** Смена пароля
   * @param oldPassword
   * @param newPassword
   */
  changePassword = ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string
    newPassword: string
  }) => {
    return fetch(`${API_URL}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then(result => result.json())
      .then(data => console.log('data: ', data))
      .catch(error => console.log(error))
  }

  /** Смена аватара
   * @param data
   */
  changeAvatar = (data: FormData) => {
    return fetch(`${API_URL}/user/profile/avatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(result => result.json())
      .then(data => console.log('data: ', data))
      .catch(error => console.log(error))
  }
}

export const UserActionsApi = new UserApi()
