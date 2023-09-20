import type { CSSProperties } from 'react'

import { birthdayDot } from './style.module.scss'

const colours = [
  'rgb(var(--neutral-700))',
  'rgb(var(--primary-700))',
  'rgb(var(--primary-400))',
  'rgb(var(--primary-300))',
  'rgb(var(--primary-200))',
]

const colourByCount = (count: number) => {
  return colours[Math.min(count, colours.length - 1)]
}

const BirthdayDot = ({ count }: { count: number }) => {
  return <div className={birthdayDot} style={{ '--dot-colour': colourByCount(count) } as CSSProperties} />
}

export default BirthdayDot
