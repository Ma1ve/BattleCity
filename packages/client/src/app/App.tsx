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
import Page404 from '../pages/Page404'
import Page500 from '../pages/Page500'

const router = createBrowserRouter(
  createRoutesFromElements(
    // Статья, которая может помочь реплизовать ErrorBoundary в связке с react-router-dom используя errorElement https://reactrouter.com/en/main/route/error-element
    // Проверьте названия маршрутов, пишите в группу, какой url можно им дать

    <Route
      path="/"
      element={<RootLayout />} /* errorElement={<ErrorBoundary />} */
    >
      <Route index element={<Main />} />
      <Route path="forum" element={<Forum />} />
      <Route path="topic" element={<TopicForum />} />
      <Route path="game" element={<Game />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="registration" element={<Registration />} />
      <Route path="page404" element={<Page404 />} />
      <Route path="page500" element={<Page500 />} />

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
