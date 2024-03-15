import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Error404 from './pages/404'
import About from './pages/about'
import Birthday from './pages/birthday'
import Home from './pages/home'
import Palette from './pages/palette'
import Rotor from './pages/rotors'
import PageWrapper from './pages/wrapper'

import './global/index.scss'

const menuItems = [
  { title: 'Home', href: '/home' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]

const otherPages = [
  { path: '/rotors', element: <Rotor /> },
  { path: '/birthday', element: <Birthday /> },
  { path: '/palette', element: <Palette /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper menuItems={menuItems} />,
    errorElement: (
      <PageWrapper menuItems={menuItems}>
        <Error404 />
      </PageWrapper>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      ...otherPages,
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
