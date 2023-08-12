import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from './App'
import './index.css'

import { PATHS } from './router/paths'
import InboxPage from './pages/InboxPage/InboxPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.DEFAULT} element={<InboxPage />}>
      <Route path={PATHS.DASHBOARD} element={<InboxPage />} />
      <Route path={PATHS.INBOX} element={<InboxPage />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
