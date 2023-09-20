import { useEffect, useState } from 'react'

import BirthdayCalendar from '../../components/birthday/calendar'
import FloatingLink from '../../components/link'

import { birthday } from './style.module.scss'

const Birthday = () => {
  const days = 365
  const people = 50

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

      <BirthdayCalendar days={days} filled={filled} />

      <FloatingLink label="Update" onClick={regenerateFilled} />
    </div>
  )
}

export default Birthday
