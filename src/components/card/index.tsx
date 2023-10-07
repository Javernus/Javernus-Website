import cl from 'clsx'
import { type ReactNode, useEffect, useRef } from 'react'

import { getRelativeMousePosition, setMousePosition } from '../../utilities/mouse'

import { card, card__glint } from './style.module.scss'

const Card = ({ children, className, imageUrl }: { imageUrl?: string; className?: string; children: ReactNode }) => {
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
    <div className={cl(card, className)} ref={cardReference} style={{ backgroundImage: `url("${imageUrl}")` }}>
      {children}
      <div className={card__glint} />
    </div>
  )
}

export default Card
