import { renderToString } from 'react-dom/server'
import {
  StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server'

import { Provider } from 'react-redux'

import { createStore } from './app/store'
import { createFetchRequest } from './createFetchRequest'

import { routes } from './app/router/routes'

import { IncomingMessage } from 'http'

interface Props {
  path: string
  data: Record<string, unknown>
  req: IncomingMessage
}

export const render = async ({ path, data, req }: Props) => {
  const store = createStore(data)

  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  const router = createStaticRouter(dataRoutes, context as StaticHandlerContext)

  const html = renderToString(
    <Provider store={store}>
      <StaticRouterProvider
        router={router}
        context={context as StaticHandlerContext}
      />
    </Provider>
  )

  const state = `
    <script>
        window.__PREPARED_STATE__ = ${JSON.stringify(store.getState()).replace(
          /</g,
          '\\u003c'
        )}
    </script>`

  return { html, state, head: '' }
}
