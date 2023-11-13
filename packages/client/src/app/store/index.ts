import * as toolkitRaw from '@reduxjs/toolkit'
const { configureStore } = toolkitRaw.default ?? toolkitRaw

import { combineReducers } from 'redux'

import { store } from '../../entry-client'
import userReducer from './reducers/UserSlice'
import tanksReducer from './reducers/TanksSlice'
import { emojiAPI } from './api/emojiAPI'

const rootReducer = combineReducers({
  user: userReducer,
  tanks: tanksReducer,
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
