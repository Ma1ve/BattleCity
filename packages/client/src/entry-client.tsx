import React from 'react'
import ReactDOM from 'react-dom/client'
import { TestApp } from './app/testApp'

const container = document.getElementById('root')

const MainApp = () => {
  return (
    <React.StrictMode>
      <TestApp />
    </React.StrictMode>
  )
}

if (import.meta.hot) {
  console.log('create')
  ReactDOM.createRoot(container as HTMLElement).render(<MainApp />)
} else {
  console.log('hydrate')
  ReactDOM.hydrateRoot(container as HTMLElement, <MainApp />)
}
