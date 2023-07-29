import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home'
import PageWrapper from './pages/wrapper'

import './global/index.scss'

const menuItems = [
  { title: 'Home', href: '/home' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper menuItems={menuItems} />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
