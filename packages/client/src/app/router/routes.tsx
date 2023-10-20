import { Route, createRoutesFromElements } from 'react-router-dom'
import { ERoutes } from '../models/types'
import { ErrorBoundary } from '../../shared/lib/ErrorBoundary'

import RootLayout from './RootLayout'

import Main from '../../pages/Main'
import Login from '../../pages/Login/ui'
import Registration from '../../pages/Registration/ui'
import Profile from '../../pages/Profile'
import { Forum } from '../../pages/Forum/index'
import Game from '../../pages/Game'
import EndGame from '../../pages/EndGame'
import GameToStart from '../../pages/GameToStart'
import Leaderboard from '../../pages/Leaderboard'
import ErrorPage from '../../pages/ErrorPage'

export const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<RootLayout />}
    errorElement={<RootLayout children={<ErrorBoundary />} />}>
    <Route index element={<Main />} />
    <Route path={ERoutes.LOGIN} element={<Login />} />
    <Route path={ERoutes.REGISTRATION} element={<Registration />} />
    <Route path={ERoutes.PROFILE} element={<Profile />} />
    <Route path={ERoutes.FORUM} element={<Forum />} />
    <Route path={ERoutes.GAME} element={<Game />} />
    <Route path={ERoutes.ENDGAME} element={<EndGame />} />
    <Route path={ERoutes.GAMETOSTART} element={<GameToStart />} />
    <Route path={ERoutes.LEADERBOARD} element={<Leaderboard />} />
    <Route path={ERoutes.ERROR400} element={<ErrorPage code="400" />} />
    <Route path={ERoutes.ERROR404} element={<ErrorPage code="404" />} />
    <Route path={ERoutes.ERROR500} element={<ErrorPage code="500" />} />
    <Route path="*" element={<ErrorPage code="404" />} />
  </Route>
)
