import { useEffect, useState } from 'react'

import BirthdayCalendar from '../../components/birthday/calendar'
import BirthdayDot from '../../components/birthday/dot'
import FloatingLink from '../../components/link'

import { birthday, birthday__calendar, birthday__dotExplainer, birthday__dotExplainers } from './style.module.scss'

const Birthday = () => {
  const days = 365
  const people = 100

  const [filled, setFilled] = useState<{ day: number; count: number }[]>([])

  const regenerateFilled = () => {
    const newFilled: { day: number; count: number }[] = []

    // Randomly with .95 probability, add a person to a day.
    for (let i = 0; i < people; i++) {
      const newDay = Math.floor(Math.random() * days) + 1

      if (newFilled.find(({ day }) => day === newDay)) {
        newFilled.find(({ day }) => day === newDay)!.count++
      } else {
        newFilled.push({ day: newDay, count: 1 })
      }
    }

    setFilled(newFilled)
  }

  useEffect(() => {
    regenerateFilled()
  }, [])

  return (
    <div className={birthday}>
      <h1>The Birthday Paradox</h1>
      <p>
        Shown are {days} days and {people} people's birthdays, randomly assigned.
      </p>

      <div className={birthday__dotExplainers}>
        {[
          { count: 0, title: '0' },
          { count: 1, title: '1' },
          { count: 2, title: '2' },
          { count: 3, title: '3' },
          { count: 4, title: '4+' },
        ].map(({ count, title }) => (
          <div className={birthday__dotExplainer}>
            <BirthdayDot count={count} />
            <p>{title} people</p>
          </div>
        ))}
      </div>

      <BirthdayCalendar className={birthday__calendar} days={days} filled={filled} />

      <FloatingLink label="Update" onClick={regenerateFilled} />
    </div>
  )
}

export default Birthday
