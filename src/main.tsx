import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoute } from './App'

import './services/firebase'
import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoute />
  </React.StrictMode>,
)
