import type { CSSProperties } from 'react'

import cl from 'clsx'

import BirthdayDot from '../dot'

import { birthdayCalendar } from './style.module.scss'

const BirthdayCalendar = ({
  className,
  days,
  filled,
}: {
  days: number
  filled: { day: number; count: number }[]
  className: string
}) => {
  return (
    <div
      className={cl(birthdayCalendar, className)}
      style={{ '--horizontal-dot-count': Math.floor(Math.sqrt(days)) } as CSSProperties}
    >
      {Array.from({ length: days }).map((_, i) => {
        const day = i + 1
        const count = filled.find(({ day: filledDay }) => filledDay === day)?.count ?? 0
        return <BirthdayDot key={day} count={count} />
      })}
    </div>
  )
}

export default BirthdayCalendar
