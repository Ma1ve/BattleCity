import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

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

export enum ERoutes {
  INDEX = '/',
  LOGIN = 'login',
  PROFILE = 'profile',
  REGISTRATION = 'registration',
  GAME = 'game',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  TOPIC = 'topic',
  ERROR400 = 'error400',
  ERROR404 = 'error404',
  ERROR500 = 'error500',
}

const router = createBrowserRouter(
  createRoutesFromElements(
    // Статья, которая может помочь реплизовать ErrorBoundary в связке с react-router-dom используя errorElement https://reactrouter.com/en/main/route/error-element
    // Проверьте названия маршрутов, пишите в группу, какой url можно им дать

    <Route
      path="/"
      element={<RootLayout />} /* errorElement={<ErrorBoundary />} */
    >
      <Route index element={<Main />} />
      <Route path={ERoutes.LOGIN} element={<Login />} />
      <Route path={ERoutes.PROFILE} element={<Profile />} />
      <Route path={ERoutes.REGISTRATION} element={<Registration />} />
      <Route path={ERoutes.GAME} element={<Game />} />
      <Route path={ERoutes.LEADERBOARD} element={<Leaderboard />} />
      <Route path={ERoutes.FORUM} element={<Forum />} />
      <Route path={ERoutes.TOPIC} element={<TopicForum />} />
      <Route path={ERoutes.ERROR400} element={<ErrorPage code="400" />} />
      <Route path={ERoutes.ERROR404} element={<ErrorPage code="404" />} />
      <Route path={ERoutes.ERROR500} element={<ErrorPage code="500" />} />
      <Route path="*" element={<ErrorPage code="404" />} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
