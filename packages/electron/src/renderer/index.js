import React from 'react'
import ReactDOM from 'react-dom'
import '@app/core/index.css'

const element = document.getElementById('app')

async function renderApp() {
  delete require.cache[require.resolve('@app/core/App')]
  const { default: App } = await import('@app/core/App')
  ReactDOM.render(<App />, element)
}

renderApp()

if (module.hot) {
  module.hot.accept() 
}