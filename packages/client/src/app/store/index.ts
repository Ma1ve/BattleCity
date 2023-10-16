import * as toolkitRaw from '@reduxjs/toolkit'
const { configureStore } = toolkitRaw.default ?? toolkitRaw

import { store } from '../../entry-client'

import userReducer from './reducers/UserSlice'
import { emojiAPI } from './api/emojiAPI'

const rootReducer = toolkitRaw.combineReducers({
  user: userReducer,
  [emojiAPI.reducerPath]: emojiAPI.reducer,
})

export const createStore = (initialState: Record<string, unknown>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(emojiAPI.middleware),
    preloadedState: initialState,
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare global {
  type RootState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}
