import { Link, useLocation, matchRoutes } from 'react-router-dom'
import cl from 'clsx'

import style from './style.module.scss'
import { useEffect, useRef } from 'react'

const Navigation = ({ menuItems }: { menuItems: { title: string; href: string }[] }) => {
  const useActivePath = () => {
    const location = useLocation()
    const paths = menuItems.map(item => ({ path: item.href }))
    const path = matchRoutes(paths, location) || []
    return path[0]?.route.path
  }

  const activePath = useActivePath()
  const navigationReference = useRef<HTMLUListElement>(null)

  const onMouseMove = (e: MouseEvent) => {
    // If the mouse is on the upper third of the screen, animate the navigation to top: 2rem. Else, animate it to top: -4rem.
    if (!navigationReference.current) return

    const isMouseOnTop = e.clientY < document.documentElement.clientHeight / 3

    navigationReference.current.className = cl(style['navigation'], {
      [style['navigation--visible'] as string]: isMouseOnTop,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <ul className={style['navigation']} ref={navigationReference}>
      <li className={cl(style['navigation__item'], style['navigation__logo-item'])}>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={style['navigation__logo']}>
            <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
          </svg>
        </Link>
      </li>
      {menuItems.map(item => (
        <li
          key={item.href}
          className={cl(style['navigation__item'], {
            [style['navigation__item--active'] as string]:
              activePath === item.href || (!activePath && item.href === '/home'),
          })}
        >
          <Link to={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Navigation
