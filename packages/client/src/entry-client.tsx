import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createStore } from './app/store'
import { routes } from './app/router/routes'
import { Store } from 'redux'

declare global {
  interface Window {
    __PREPARED_STATE__: RootState
  }
}

let store: Store

if (typeof window !== 'undefined') {
  const preparedState =
    typeof window.__PREPARED_STATE__ === 'object'
      ? JSON.parse(JSON.stringify(window.__PREPARED_STATE__))
      : {}

  store = createStore(preparedState)

  delete window.__PREPARED_STATE__

  const rootElement = document.getElementById('root') as HTMLElement

  const router = createBrowserRouter(routes)

  const app = (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )

  if (import.meta.hot) {
    console.log('create')
    ReactDOM.createRoot(rootElement).render(app)
  } else {
    console.log('hydrate')
    ReactDOM.hydrateRoot(rootElement, app)
  }
} else {
  store = createStore({})
}

export { store }
