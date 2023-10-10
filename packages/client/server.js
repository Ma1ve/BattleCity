import express from 'express'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'

import { createServer as createSsrServer } from 'vite'

const isProduction = process.env.NODE_ENV === 'production'

const getStyleSheets = async () => {
  try {
    const assetsPath = './dist/client/assets'
    const files = await fs.promises.readdir(assetsPath)
    const cssAssets = files.filter(l => l.endsWith('.css'))

    const allContent = []

    for (const asset of cssAssets) {
      const content = await fs.promises.readFile(
        path.join(assetsPath, asset),
        'utf-8'
      )

      allContent.push(content)
    }

    return `<style type="text/css">${allContent.join('')}</style>`
  } catch (error) {
    console.log(error)
    return ''
  }
}

async function createServer() {
  const app = express()
  app.use(cookieParser())

  const vite = await createSsrServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })

  if (isProduction) {
    app.use(express.static('dist/client', { index: false }))
  } else {
    app.use(vite.middlewares)
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    let template
    let render

    try {
      if (!isProduction) {
        template = fs.readFileSync(path.resolve('./index.html'), 'utf-8')

        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = fs.readFileSync(
          path.resolve('dist/client/index.html'),
          'utf-8'
        )

        render = (await import('./dist/server/entry-server.js')).render
      }

      const rendered = await render({
        path: url,
        data: {},
        req,
      })

      const stylesSheets = isProduction ? await getStyleSheets() : ''

      const html = template
        .replace(`<!--app-html-->`, rendered.html ?? '')
        .replace(`<!--app-state-->`, rendered.state ?? '')
        .replace(`<!--app-head-->`, stylesSheets ?? '')

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite?.ssrFixStacktrace(error)

      console.log(error.stack)

      res.status(500).end(error.stack)
    }
  })

  app.listen(3000)
}

createServer().then(() => {
  console.log('http://localhost:3000')
})
