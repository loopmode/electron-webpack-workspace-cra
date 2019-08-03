import React from 'react'
import ReactDOM from 'react-dom'
import '@app/core/lib/index.css'

const element = document.getElementById('app')

async function renderApp() {
  const { default: App } = await import('@app/core/lib/App')
  ReactDOM.render(<App />, element)
}

renderApp()

if (module.hot) {
  console.log('enable hmr', { env: process.env })
  module.hot.accept()
  // module.hot.accept(error => console.warn('accept self', { error }))
  // module.hot.accept('@local/app/lib/App', () => {
  //   console.log('HMR ACCEPTED!')
  //   renderApp()
  // })
  // module.hot.addStatusHandler(status => console.info({ status }))
}
