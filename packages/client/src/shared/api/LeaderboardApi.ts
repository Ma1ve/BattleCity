import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from './consts'

export type LeaderboardData = {
  veisaScore: number
  name: string
  id: string
}

type GetLeaderboardResponse = { data: LeaderboardData }[]

class LeaderboardApi {
  private instance: AxiosInstance
  private teamName = 'V.E.I.S.A'
  private ratingFieldName = 'veisaScore' //API общее для всех команд, нужно чтобы у каждой команды был уникальный ratingFieldName

  protected createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'json',
      timeout: 5 * 1000,
    })
  }

  constructor() {
    this.instance = this.createAxiosInstance()
  }

  /** отправка результата игры
   * @param score
   * @param name
   * @param id
   */
  sendResult = async ({
    score,
    name,
    id,
  }: {
    score: number
    name: string
    id: number
  }) => {
    await this.instance.post(`/leaderboard`, {
      data: {
        name,
        id,
        veisaScore: score,
      },
      ratingFieldName: this.ratingFieldName,
      teamName: this.teamName,
    })
  }

  /** Получение лидерборда  */
  getLeaderboard = async (): Promise<GetLeaderboardResponse> => {
    const response = await this.instance.post(`/leaderboard/all`, {
      ratingFieldName: this.ratingFieldName,
      cursor: 0,
      limit: 10,
    })

    return response.data
  }
}

export const LeaderboardAPI = new LeaderboardApi()
