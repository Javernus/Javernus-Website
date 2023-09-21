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
      },
      150,
      { leading: true, trailing: true }
    ),
    []
  )

  useEffect(() => {
    regenerateFilled(days, people)
  }, [])

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

              if (d < people) setPeople(d)
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

      <FloatingLink label="Update" onClick={() => regenerateFilled(days, people)} />

      <DotGraph
        className={birthday__graph}
        dots={filled.map(({ count, day }) => ({ x: day, y: count }))}
        xRange={{ minimum: 0, maximum: days }}
        yRange={{ minimum: 0 }}
      />
    </div>
  )
}

export default Birthday
