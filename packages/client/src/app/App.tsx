import React, { useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ErrorBoundary } from '../shared/lib/ErrorBoundary'
import RootLayout from './RootLayout'
import Main from '../pages/Main'
import Forum from '../pages/Forum'
import Game from '../pages/Game'
import Leaderboard from '../pages/Leaderboard'
import Login from '../pages/Login/ui'
import Profile from '../pages/Profile'
import Registration from '../pages/Registration/ui'
import TopicForum from '../pages/TopicForum'
import ErrorPage from '../pages/ErrorPage'
import EndGame from '../pages/EndGame'
import GameToStart from '../pages/GameToStart'
import { useAppSelector } from './hooks/reducer'
import { selectUserInfo } from './store/reducers/UserSlice'
import { AuthAPI } from '../shared/api/AuthApi'

export enum ERoutes {
  INDEX = '/',
  LOGIN = 'login',
  PROFILE = 'profile',
  REGISTRATION = 'registration',
  GAME = 'game',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  TOPIC = 'topic',
  ENDGAME = 'endgame',
  GAMETOSTART = 'loading',
  ERROR400 = 'error400',
  ERROR404 = 'error404',
  ERROR500 = 'error500',
}

function App() {
  const userInfo = useAppSelector(selectUserInfo)

  useEffect(() => {
    AuthAPI.getUserData()
  }, [])

  return (
    <div className="App">
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route
              path="/"
              element={<RootLayout />}
              errorElement={<RootLayout children={<ErrorBoundary />} />}>
              <Route index element={<Main />} />
              <Route path={ERoutes.LOGIN} element={<Login />} />
              <Route path={ERoutes.REGISTRATION} element={<Registration />} />
              <Route path={ERoutes.PROFILE} element={<Profile />} />
              <Route path={ERoutes.FORUM} element={<Forum />} />
              <Route path={ERoutes.TOPIC} element={<TopicForum />} />
              <Route path={ERoutes.GAME} element={<Game />} />
              <Route path={ERoutes.ENDGAME} element={<EndGame />} />
              <Route path={ERoutes.GAMETOSTART} element={<GameToStart />} />
              <Route path={ERoutes.LEADERBOARD} element={<Leaderboard />} />
              <Route
                path={ERoutes.ERROR400}
                element={<ErrorPage code="400" />}
              />
              <Route
                path={ERoutes.ERROR404}
                element={<ErrorPage code="404" />}
              />
              <Route
                path={ERoutes.ERROR500}
                element={<ErrorPage code="500" />}
              />
              <Route path="*" element={<ErrorPage code="404" />} />
            </Route>
          )
        )}
      />
      <ToastContainer theme="dark" position="bottom-right" autoClose={5000} />
    </div>
  )
}

export default App
