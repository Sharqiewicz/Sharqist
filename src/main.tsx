import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import './index.css'

import { PATHS } from './router/paths'
import InboxPage from './pages/InboxPage/InboxPage'

import { ModalsProvider } from './modals/ModalsContext'
import { ModalsManager } from './modals/ModalsManager'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.DEFAULT} element={<InboxPage />}>
      <Route path={PATHS.DASHBOARD} element={<InboxPage />} />
      <Route path={PATHS.INBOX} element={<InboxPage />} />
      <Route path={PATHS.TODAY} element={<InboxPage />} />
      <Route path={PATHS.ADD_TASK} element={<InboxPage />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalsProvider>
      <RouterProvider router={router} />
      <ModalsManager />
    </ModalsProvider>
  </React.StrictMode>,
)
