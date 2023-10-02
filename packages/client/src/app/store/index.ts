import * as toolkitRaw from '@reduxjs/toolkit'
const { configureStore } = toolkitRaw.default ?? toolkitRaw

import { store } from '../../entry-client'

import userReducer from './reducers/UserSlice'

export const createStore = (initialState: Record<string, unknown>) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare global {
  type RootState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}
