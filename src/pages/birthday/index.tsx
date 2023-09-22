import { throttle as _throttle } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import BirthdayCalendar from '../../components/birthday/calendar'
import BirthdayDot from '../../components/birthday/dot'
import DotGraph from '../../components/dot-graph'
import FloatingLink from '../../components/link'
import Slider from '../../components/slider'

import {
  birthday,
  birthday__calendar,
  birthday__calendarAndGraph,
  birthday__calendarContainer,
  birthday__dotExplainer,
  birthday__dotExplainers,
  birthday__graph,
  birthday__inputSlider,
  birthday__inputSliders,
} from './style.module.scss'

const Birthday = () => {
  const [days, setDays] = useState(365)
  const [people, setPeople] = useState(23)

  const [filled, setFilled] = useState<{ day: number; count: number }[]>([])

  const [doubleBirthdayPercentage, setDoubleBirthdayPercentage] = useState<{ x: number; y: number; id: string }[]>([])

  const generateGraph = useCallback((dayCount: number) => {
    const newGraph: { x: number; y: number; id: string }[] = []

    const iterateBirthdays = (pCount: number): boolean => {
      const birthdays: number[] = []

      for (let i = 0; i < pCount; i++) {
        const newDay = Math.floor(Math.random() * dayCount) + 1

        if (birthdays.includes(newDay)) return true

        birthdays.push(newDay)
      }

      return false
    }

    for (let pCount = 1; pCount <= 100; pCount++) {
      let collisionCount = 0

      for (let i = 0; i < 100; i++) {
        if (iterateBirthdays(pCount)) collisionCount++
      }

      newGraph.push({ x: pCount, y: collisionCount, id: pCount.toString() })
    }

    setDoubleBirthdayPercentage(newGraph)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regenerateFilled = useCallback(
    _throttle(
      (dayCount: number, peopleCount: number) => {
        const newFilled: { day: number; count: number }[] = []

        for (let i = 0; i < peopleCount; i++) {
          const newDay = Math.floor(Math.random() * dayCount) + 1

          if (newFilled.find(({ day }) => day === newDay)) {
            newFilled.find(({ day }) => day === newDay)!.count++
          } else {
            newFilled.push({ day: newDay, count: 1 })
          }
        }

        setFilled(newFilled)

        generateGraph(dayCount)
      },
      150,
      { leading: true, trailing: true }
    ),
    []
  )

  useEffect(() => {
    regenerateFilled(days, people)
  }, [days, people, regenerateFilled])

  return (
    <div className={birthday}>
      <h1>The Birthday Paradox</h1>
      <p>
        Shown are {days} days and {people} people's birthdays, randomly assigned.
      </p>

      <div className={birthday__inputSliders}>
        <div className={birthday__inputSlider}>
          <p>Days</p>
          <Slider
            value={days}
            onChange={d => {
              setDays(d)

              if (d < 2 * people) setPeople(d)
            }}
            minimum={1}
            maximum={500}
          />
        </div>

        <div className={birthday__inputSlider}>
          <p>People</p>
          <Slider
            value={people}
            onChange={p => {
              setPeople(p)
            }}
            minimum={1}
            maximum={2 * days}
          />
        </div>
      </div>

      <div className={birthday__calendarAndGraph}>
        <div className={birthday__calendarContainer}>
          <div className={birthday__dotExplainers}>
            {[
              { count: 0, title: '0' },
              { count: 1, title: '1' },
              { count: 2, title: '2' },
              { count: 3, title: '3' },
              { count: 4, title: '4+' },
            ].map(({ count, title }) => (
              <div className={birthday__dotExplainer}>
                <BirthdayDot key={count} count={count} />
                <p>{title} people</p>
              </div>
            ))}
          </div>

          <BirthdayCalendar className={birthday__calendar} days={days} filled={filled} />
        </div>

        <DotGraph
          className={birthday__graph}
          dots={doubleBirthdayPercentage}
          xProperties={{ title: '# people', minimum: -5, maximum: 100 }}
          yProperties={{ title: '% double birthday', minimum: -5, maximum: 100 }}
        />
      </div>

      <FloatingLink label="Update" onClick={() => regenerateFilled(days, people)} />
    </div>
  )
}

export default Birthday
