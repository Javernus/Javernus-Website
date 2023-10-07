import { throttle as _throttle } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import Latex from 'react-latex-next'

import BirthdayCalendar from '../../components/birthday/calendar'
import BirthdayDot from '../../components/birthday/dot'
import Card from '../../components/card'
import Divider from '../../components/divider'
import DotGraph from '../../components/dot-graph'
import FloatingLink from '../../components/link'
import Slider from '../../components/slider'

import { limits } from './limits'

import {
  birthday,
  birthday__buttons,
  birthday__calendar,
  birthday__calendarAndGraph,
  birthday__card,
  birthday__divider,
  birthday__dotExplainer,
  birthday__dotExplainers,
  birthday__graph,
  birthday__inputSlider,
  birthday__inputSliders,
} from './style.module.scss'

type GraphData = {
  data: { x: number; y: number; divideYBy?: number; id: string }[]
  days: number
}

const Birthday = () => {
  const [superUpdateCount, setSuperUpdateCount] = useState(-1)
  const [days, setDays] = useState(365)
  const [people, setPeople] = useState(23)

  const [filled, setFilled] = useState<{ day: number; count: number }[]>([])

  const [doubleBirthdayPercentage, setDoubleBirthdayPercentage] = useState<GraphData>({ data: [], days })

  const generateGraph = useCallback((dayCount: number, previousGraph: GraphData) => {
    const isSameDays = dayCount === previousGraph.days
    const newGraph: GraphData['data'] = []

    const iterateBirthdays = (pCount: number): boolean => {
      const birthdays: number[] = []

      for (let i = 0; i < pCount; i++) {
        const newDay = Math.floor(Math.random() * dayCount) + 1

        if (birthdays.includes(newDay)) return true

        birthdays.push(newDay)
      }

      return false
    }

    for (let pCount = 1; pCount <= 50; pCount++) {
      let collisionCount = 0

      for (let i = 0; i < 100; i++) {
        if (iterateBirthdays(pCount)) collisionCount++
      }

      if (isSameDays) {
        const previous = previousGraph.data.find(({ x }) => x === pCount) ?? { y: 0, divideYBy: 0 }

        newGraph.push({
          x: pCount,
          y: previous.y + collisionCount,
          divideYBy: (previous.divideYBy ?? 1) + 1,
          id: pCount.toString(),
        })
      } else {
        newGraph.push({ x: pCount, y: collisionCount, id: pCount.toString() })
      }
    }

    setDoubleBirthdayPercentage({ data: newGraph, days: dayCount })
  }, [])

  const unthrottledRegenerateFilled = (
    dayCount: number,
    peopleCount: number,
    graphData: GraphData,
    sUCUpdate?: number
  ): GraphData => {
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

    generateGraph(dayCount, graphData)

    if (sUCUpdate) {
      console.log(sUCUpdate)
      setSuperUpdateCount(sUCUpdate + 1)
    }

    return graphData
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const regenerateFilled = useCallback(
    _throttle(unthrottledRegenerateFilled, 150, { leading: true, trailing: true }),
    []
  )

  useEffect(() => {
    console.log(superUpdateCount)
    if (superUpdateCount < 100 && superUpdateCount >= 0) {
      regenerateFilled(days, people, doubleBirthdayPercentage, superUpdateCount + 1)
    } else setSuperUpdateCount(-1)
  }, [superUpdateCount])

  useEffect(() => {
    regenerateFilled(days, people, doubleBirthdayPercentage)
  }, [days, people, regenerateFilled])

  return (
    <div className={birthday}>
      <h1>The Birthday Problem</h1>
      <Card className={birthday__card}>
        <p>
          The birthday problem is a famous probability problem that asks the question: "What is the probability that two
          people in a room share a birthday?"
        </p>
        <p>
          More generally, one can ask what the chance of collision is when randomly sampling q samples from N options.
          We write this down as <Latex>$P(q, N)$</Latex>.
        </p>
        <p>This page will visualise the intricacies of the Birthday Problem.</p>
      </Card>

      <Divider className={birthday__divider} />

      <p>
        This page gives you five controls. The first allows you to determine the amount of options, or days,{' '}
        <Latex>$N$</Latex>. It defaults to 365 for obvious reasons.
      </p>
      <p>
        The second control is the amount of people, or samples, <Latex>$p$</Latex>. It defaults to 23, which should
        approximately give a 50% chance of collision for <Latex>$N = 365$</Latex>.
      </p>
      <p>
        The third, fourth and fifth controls are a reset button, an update button and a super-update button. These
        simply reset the plot and redraw the samples, with the latter doing so 100 times.
      </p>

      <Divider className={birthday__divider} />

      <p style={{ marginBottom: '0.75rem' }}>
        The dot plots that you will see contain several coloured dots. Each of these dots represents a day. Each colour
        represents how many people's birthday it is on this day:
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
            <BirthdayDot key={count} count={count} />
            <p>{title} people</p>
          </div>
        ))}
      </div>

      <Divider className={birthday__divider} />

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
            maximum={50}
          />
        </div>
      </div>

      <p>
        <Latex>{`$N = ${days.toString()}$ and $q = ${people.toString()}$`}</Latex>
      </p>

      <div className={birthday__buttons}>
        <FloatingLink label="Reset" onClick={() => generateGraph(days, { data: [], days })} />
        <FloatingLink label="Update" onClick={() => regenerateFilled(days, people, doubleBirthdayPercentage)} />
        <FloatingLink label="Super update" onClick={() => setSuperUpdateCount(0)} />
      </div>

      <p>Super update {superUpdateCount === -1 ? 'is inactive' : `at ${superUpdateCount} out of 100`}.</p>

      <Divider className={birthday__divider} />

      <div className={birthday__calendarAndGraph}>
        <BirthdayCalendar className={birthday__calendar} days={days} filled={filled} />

        <DotGraph
          className={birthday__graph}
          dots={[
            ...doubleBirthdayPercentage.data.map(({ divideYBy, id, x, y }) => ({
              id,
              x,
              y: y / (divideYBy ?? 1),
            })),

            ...limits.lowerBound(days),
            ...limits.upperBound(days),
          ]}
          xProperties={{ title: '# people', minimum: -5, maximum: 50 }}
          yProperties={{ title: '% double birthday', minimum: -5, maximum: 100 }}
          lines={[
            { x1: people > 50 ? 50 : people, y1: -5, x2: people > 50 ? 50 : people, y2: 105 },
            { x1: -5, y1: 50, x2: 55, y2: 50 },
          ]}
        />
      </div>

      <Divider className={birthday__divider} />

      <p>
        Each update randomly samples <Latex>{'$q = \\textrm{people}$'}</Latex> birthdays over{' '}
        <Latex>{'$N = \\textrm{days}$'}</Latex> days. The percentage of collisions is then calculated and plotted.
      </p>

      <p>
        Each subsequent update will average its results in the graph. The reset button or changing the amount of days
        will reset this.
      </p>

      <p>
        In the graph, one can see two bounds for the probability: <Latex>{'$y = \\frac{q(q - 1)}{2N}$'}</Latex> and{' '}
        <Latex>{'$y = 0.632 \\frac{q(q - 1)}{2N}$'}</Latex>. These bound the probability of collision for small{' '}
        <Latex>$q$</Latex> compared to <Latex>$N$</Latex>, which is useful in cryptography when N is usually very large
        (2<sup>64</sup> or larger).
      </p>

      <Divider className={birthday__divider} />
    </div>
  )
}

export default Birthday
