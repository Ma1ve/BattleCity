import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EmojiResponseData } from '../../models/IEmoji'

const { BASE_URL } = import.meta.env

export const emojiAPI = createApi({
  reducerPath: 'emojiAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/emoji` }),
  tagTypes: ['Emoji'],
  endpoints: builder => ({
    getAllEmoji: builder.query({
      query: () => {
        return {
          url: `/get`,
          method: 'GET',
        }
      },
      transformResponse: (response: EmojiResponseData): string[] => {
        return Object.values(response.emoji)
      },
      keepUnusedDataFor: 60,
      providesTags: ['Emoji'],
    }),
  }),
})

export const { useGetAllEmojiQuery } = emojiAPI
