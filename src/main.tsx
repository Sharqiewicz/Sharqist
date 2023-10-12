import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import './index.css'

import { HistoryPage, InboxPage, TodayPage } from './pages'

import { ModalsProvider } from './modals/ModalsContext'
import { ModalsManager } from './modals/ModalsManager'

import { SidebarProvider } from './hooks'

import { PATHS } from './router/paths'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATHS.TODAY} element={<TodayPage />} />
      <Route path={PATHS.INBOX} element={<InboxPage />} />
      <Route path={PATHS.HISTORY} element={<HistoryPage />} />
      <Route path={PATHS.DASHBOARD} element={<TodayPage />} />
      <Route path={PATHS.ADD_TASK} element={<TodayPage />} />
      <Route path={PATHS.DEFAULT} element={<InboxPage />} />
    </>,
  ),
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModalsProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
        <ModalsManager />
      </SidebarProvider>
    </ModalsProvider>
  </React.StrictMode>,
)
