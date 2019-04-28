import React from 'react';
import ReactDOM from 'react-dom';
import '@packages/app/lib/index.css';

const element = document.getElementById('app');

function renderApp() {
  const App = require('@packages/app/lib/App').default;
  ReactDOM.render(<App />, element);
}

renderApp();
