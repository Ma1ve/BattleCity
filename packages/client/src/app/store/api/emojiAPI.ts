// For production
import pkg from '@reduxjs/toolkit/dist/query/react/index.js'
const { fetchBaseQuery } = pkg

// For development
//import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import * as toolkitRaw from '@reduxjs/toolkit/dist/query/react'
const { createApi } = toolkitRaw.default ?? toolkitRaw

import { EmojiResponseData } from '../../models/IEmoji'
import { SERVER_URL } from '../../../shared/api/consts'

export const emojiAPI = createApi({
  reducerPath: 'emojiAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}emoji` }),
  tagTypes: ['Emoji'],
  endpoints: builder => ({
    getAllEmoji: builder.query({
      query: () => {
        return {
          url: ``,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      },
      transformResponse: (response: EmojiResponseData): string[] => {
        const emojiArray = response.emoji
        return emojiArray.map(emoji => emoji.code)
      },
      keepUnusedDataFor: 60,
      providesTags: ['Emoji'],
    }),
  }),
})

export const { useGetAllEmojiQuery } = emojiAPI
