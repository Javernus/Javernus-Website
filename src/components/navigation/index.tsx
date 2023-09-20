import cl from 'clsx'
import { useEffect, useRef } from 'react'
import { Link, matchRoutes, useLocation } from 'react-router-dom'

import {
  navigation,
  navigation__item,
  navigation__itemActive,
  navigation__logo,
  navigation__logoItem,
  navigationVisible,
} from './style.module.scss'

const Navigation = ({ menuItems }: { menuItems: { title: string; href: string }[] }) => {
  const useActivePath = () => {
    const location = useLocation()
    const paths = menuItems.map(item => ({ path: item.href }))
    paths.push({ path: '/' })
    const path = matchRoutes(paths, location) || []
    return path[0]?.route.path === '/' ? '/home' : path[0]?.route.path
  }

  const activePath = useActivePath()
  const navigationReference = useRef<HTMLUListElement>(null)

  const onMouseMove = (e: MouseEvent) => {
    // If the mouse is on the upper third of the screen, animate the navigation to top: 2rem. Else, animate it to top: -4rem.
    if (!navigationReference.current) return

    const isMouseOnTop = e.clientY < document.documentElement.clientHeight / 3

    navigationReference.current.className = cl(navigation, {
      [navigationVisible]: isMouseOnTop,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  console.log(activePath, menuItems.map(({ href }) => href).includes(activePath || '/home'))

  return (
    <ul className={navigation} ref={navigationReference}>
      <Link
        to="/"
        className={cl(navigation__item, navigation__logoItem, {
          [navigation__itemActive]: !activePath,
        })}
      >
        <li style={{ height: '2rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={navigation__logo}>
            <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
          </svg>
        </li>
      </Link>
      {menuItems.map(item => (
        <Link
          to={item.href}
          className={cl(navigation__item, {
            [navigation__itemActive]: activePath === item.href,
          })}
        >
          <li key={item.href}>{item.title}</li>
        </Link>
      ))}
    </ul>
  )
}

export default Navigation
