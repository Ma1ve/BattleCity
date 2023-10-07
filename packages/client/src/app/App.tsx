import React, { useCallback, useEffect } from 'react'
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
import { AuthAPI } from '../shared/api/AuthApi'
import { FullscreenButton } from '../features/ui/FullscreenButton'
import { useActionCreators } from './hooks/reducer'
import { userActions } from './store/reducers/UserSlice'
import { ERoutes } from './models/types'
import { redirectUri } from '../shared/api/consts'

function App() {
  const actions = useActionCreators(userActions)
  const authCode = new URLSearchParams(location.search).get('code')

  const OAuth = useCallback(async (code: string) => {
    await AuthAPI.sendAuthCode(code, redirectUri)
    Auth()
  }, [])

  const Auth = useCallback(async () => {
    const userData = await AuthAPI.getUserData()
    actions.setUserInfo(userData ?? null)
  }, [])

  useEffect(() => {
    if (authCode) {
      OAuth(authCode)
    }
  }, [authCode])

  useEffect(() => {
    Auth()
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
      <FullscreenButton />
    </div>
  )
}

// Закомментировал тк выдает ошибку startServiceWorker is not defined
// startServiceWorker()
export default App
