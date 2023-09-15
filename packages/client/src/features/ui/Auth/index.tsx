import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { TUserProfileData } from '../../../app/models/IUser'
import { ERoutes } from '../../../app/models/types'

interface AuthProps {
  children: JSX.Element
  userInfo: TUserProfileData | null
}

const Auth: FC<AuthProps> = ({ children, userInfo }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const routes = Object.values(ERoutes) as string[]

  useEffect(() => {
    if (routes.includes(location.pathname.substring(1))) {
      switch (location.pathname.substring(1)) {
        case ERoutes.LOGIN:
        case ERoutes.REGISTRATION: {
          if (userInfo) navigate(`/${ERoutes.GAME}`)
          break
        }
        default: {
          if (!userInfo) navigate(`/${ERoutes.LOGIN}`)
        }
      }
    }
  }, [userInfo, location])

  return children
}

export default Auth
