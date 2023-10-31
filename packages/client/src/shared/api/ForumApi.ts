import axios, { AxiosInstance } from 'axios'

import { BASE_URL } from './consts'

export interface ITopic {
  id: number | string
  author: string
  title: string
  commentCount: number
}

export interface ITopicCreate {
  id: string | number
  title: string
  author: string
  content: string
  updatedAt: string
  createdAt: string
}

export interface IComment {
  id: string | number
  content: string
  author: string
  topicId: string | number
  createdAt: string
  updatedAt: string
}

class ForumApi {
  private instance: AxiosInstance

  protected createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: `http://localhost:3001/`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'json',
      timeout: 5 * 1000,
    })
  }

  constructor() {
    this.instance = this.createAxiosInstance()
  }

  /** Получение списка топиков. */
  getTopics = async (): Promise<ITopic[]> => {
    try {
      const response = await this.instance.get(`topics`)
      return response.data
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      throw error
    }
  }

  /** Создание топика.
   * @param title
   * @param author
   */
  createTopic = async ({
    title,
    author,
    content,
  }: {
    title: string
    author: string
    content: string
  }) => {
    try {
      const response = await this.instance.post(`topics`, {
        title,
        author,
        content,
      })
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      throw error
    }
  }

  /** Создание коммента.
   * @param topicId
   * @param content
   * @param author
   */
  createComment = async ({
    topicId,
    content,
    author,
  }: {
    topicId: string
    content: string
    author: string
  }) => {
    try {
      const response = await this.instance.post(
        `comments/${topicId}/comments`,
        {
          content,
          author,
        }
      )
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      throw error
    }
  }

  /** Получение всех комментариев. */
  getAllComments = async ({ topicId }: { topicId: string }) => {
    try {
      const response = await this.instance.get(`comments/${topicId}`)
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      throw error
    }
  }

  /** Ссоздать реплай к комменту. */
  createCommentReplay = async ({
    topicId,
    commentId,
    content,
    author,
  }: {
    topicId: string
    commentId: string
    content: string
    author: string
  }) => {
    try {
      const response = await this.instance.post(
        `replies/${topicId}/comments/${commentId}/replies`,
        {
          content,
          author,
        }
      )
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      throw error
    }
  }

  /** Получить все реплаи к комменту. */
  getAllRepliesToComment = async ({
    topicId,
    commentId,
  }: {
    topicId: string
    commentId: string
  }) => {
    try {
      const response = await this.instance.get(
        `replies/${topicId}/comments/${commentId}/replies`
      )
      return response
    } catch (error: any) {
      console.error(error?.response?.data?.reason)
      return error
    }
  }
}

export const ForumAPI = new ForumApi()
