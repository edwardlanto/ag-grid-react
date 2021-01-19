import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
import { StateProvider } from './store.js';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  rootElement
)
