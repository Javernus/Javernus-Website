import { type ReactNode, useEffect, useRef } from 'react'

import { getRelativeMousePosition, setMousePosition } from '../../utilities/mouse'

import style from './style.module.scss'

const Card = ({ backgroundImage, children }: { backgroundImage?: string; children: ReactNode }) => {
  const cardReference = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent) => {
    // Add the relative position of the mouse to the card's position as CSS variables --mouse-x and --mouse-y.
    if (!cardReference.current) return

    const mousePosition = getRelativeMousePosition(e, cardReference.current)
    setMousePosition(cardReference.current, mousePosition)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className={style['card']} ref={cardReference} style={{ backgroundImage }}>
      {children}
      <div className={style['card__glint']} />
    </div>
  )
}

export default Card
