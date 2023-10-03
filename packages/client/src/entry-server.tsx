import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/App'
import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { TestApp } from './app/testApp'

export async function render(url: string, cookies: Record<string, string>) {
  const store = {}
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>
  )

  return { html, head: '' }
}
