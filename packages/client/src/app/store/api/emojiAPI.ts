import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emojiAPI = createApi({
  reducerPath: 'emojiAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3001/emoji' }),
  tagTypes: ['Emoji'],
  endpoints: builder => ({
    getAllEmoji: builder.query({
      query: () => {
        return {
          url: `/get`,
          method: 'GET',
        }
      },
      keepUnusedDataFor: 60,
      providesTags: ['Emoji'],
    }),
  }),
})

export const { useGetAllEmojiQuery } = emojiAPI
