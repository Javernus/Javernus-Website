import type { MouseEventHandler } from 'react'
import style from './style.module.scss'

const FloatingLink = ({
  label,
  onClick,
}: {
  label: string
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}) => {
  return (
    <div className={style['floating-link']} onClick={onClick}>
      <div className={style['floating-link__dot-wrapper']}>
        <div className={style['floating-link__dot']} />
      </div>
      <p className={style['floating-link__label']}>{label}</p>
    </div>
  )
}

export default FloatingLink
