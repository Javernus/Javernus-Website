import type { CSSProperties } from 'react'

import { birthdayCalendar, birthdayCalendar__dot } from './style.module.scss'

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

const BirthdayCalendar = ({ days, filled }: { days: number; filled: { day: number; count: number }[] }) => {
  return (
    <div
      className={birthdayCalendar}
      style={{ '--horizontal-dot-count': Math.floor(Math.sqrt(days)) } as CSSProperties}
    >
      {Array.from({ length: days }).map((_, i) => {
        const day = i + 1
        const count = filled.find(({ day: filledDay }) => filledDay === day)?.count ?? 0
        return (
          <div
            key={i}
            className={birthdayCalendar__dot}
            style={{ '--dot-colour': colourByCount(count) } as CSSProperties}
          />
        )
      })}
    </div>
  )
}

export default BirthdayCalendar
