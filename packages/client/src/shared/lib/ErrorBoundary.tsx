import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import ErrorPage from '../../pages/ErrorPage'

/** ErrorBoundary для react-router-dom. */
export function ErrorBoundary() {
  const error = useRouteError()
  console.error('ErrorBoundary: ', error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorPage code="404" />
    }

    if (error.status === 400) {
      return <ErrorPage code="400" />
    }

    if (error.status === 500) {
      return <ErrorPage code="500" />
    }
  }
  return <ErrorPage code="Oops!" />
}
