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
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Registration from '../pages/Registration'
import TopicForum from '../pages/TopicForum'
import Page400 from '../pages/Page400'
import Page404 from '../pages/Page404'
import Page500 from '../pages/Page500'

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
      <Route path={ERoutes.ERROR400} element={<Page400 />} />
      <Route path={ERoutes.ERROR404} element={<Page404 />} />
      <Route path={ERoutes.ERROR500} element={<Page500 />} />
      <Route path="*" element={<Page404 />} />
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
