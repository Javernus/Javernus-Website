import { type ReactNode, useEffect, useRef } from 'react'

import { isMouseInsideElement } from '../../utilities/mouse'

import { cardBox } from './style.module.scss'

const CardBox = ({ children }: { children: ReactNode }) => {
  const cardBoxReference = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent) => {
    // Add the relative position of the mouse to the card's position as CSS variables --mouse-x and --mouse-y.
    if (!cardBoxReference.current) return
    if (!isMouseInsideElement(e, cardBoxReference.current)) {
      cardBoxReference.current.style.setProperty('--show-card', '0')
      return
    }

    cardBoxReference.current.style.setProperty('--show-card', '1')
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className={cardBox} ref={cardBoxReference}>
      {children}
    </div>
  )
}

export default CardBox
