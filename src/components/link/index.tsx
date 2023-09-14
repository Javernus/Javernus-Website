import type { MouseEventHandler } from 'react'

import { floatingLink, floatingLink__dot, floatingLink__dotWrapper, floatingLink__label } from './style.module.scss'

const FloatingLink = ({
  label,
  onClick,
}: {
  label: string
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}) => {
  return (
    <div className={floatingLink} onClick={onClick}>
      <div className={floatingLink__dotWrapper}>
        <div className={floatingLink__dot} />
      </div>
      <p className={floatingLink__label}>{label}</p>
    </div>
  )
}

export default FloatingLink
