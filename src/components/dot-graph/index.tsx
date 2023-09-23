import type { HTMLAttributesAndProps } from '../../utilities/types'

import cl from 'clsx'

import {
  dotGraph,
  dotGraph__dot,
  dotGraph__line,
  dotGraph__xLabel,
  dotGraph__xMaxLabel,
  dotGraph__xZero,
  dotGraph__yLabel,
  dotGraph__yMaxLabel,
  dotGraph__yZero,
} from './style.module.scss'

const getMinimum = (dots: { x: number; y: number }[], axis: 'x' | 'y') =>
  dots.reduce((a, nextDot) => Math.min(a, nextDot[axis]), Infinity)

const getMaximum = (dots: { x: number; y: number }[], axis: 'x' | 'y') =>
  dots.reduce((a, nextDot) => Math.max(a, nextDot[axis]), -Infinity)

const getNumber = (options: (number | undefined)[]): number => {
  const filteredOptions = options.filter(option => option !== undefined) as number[]

  if (filteredOptions.length === 0) return 0

  return filteredOptions[0] as number
}

const DotGraph = ({
  dots,
  lines,
  xProperties,
  yProperties,
  ...other
}: HTMLAttributesAndProps<
  HTMLDivElement,
  {
    xProperties: { title: string; minimum?: number; maximum?: number }
    yProperties: { title: string; minimum?: number; maximum?: number }
    lines?: { x1: number; y1: number; x2: number; y2: number }[]
    dots: { x: number; y: number; id?: string }[]
  }
>) => {
  let xMaximum = getNumber([xProperties.maximum, getMaximum(dots, 'x') + 1])
  let xMinimum = getNumber([xProperties.minimum, getMinimum(dots, 'x') - 1])

  if (xMinimum >= 0) xMinimum = 0
  else if (xMaximum < 0) xMaximum = 0

  let yMaximum = getNumber([yProperties.maximum, getMaximum(dots, 'y') + 1])
  let yMinimum = getNumber([yProperties.minimum, getMinimum(dots, 'y') - 1])

  if (yMinimum >= 0) yMinimum = 0
  else if (yMaximum < 0) yMaximum = 0

  const xZero = (0 - xMinimum) / (xMaximum - xMinimum)
  const yZero = (0 - yMinimum) / (yMaximum - yMinimum)

  const { className, ...otherProps } = other

  return (
    <div className={cl(dotGraph, className)} {...otherProps}>
      <div className={dotGraph__xZero} style={{ '--x': `${xZero * 100}%` } as React.CSSProperties} />
      <p className={dotGraph__yLabel} style={{ '--x': `${xZero * 100}%` } as React.CSSProperties}>
        {yProperties.title}
      </p>
      <p className={dotGraph__yMaxLabel} style={{ '--x': `${xZero * 100}%` } as React.CSSProperties}>
        {yMaximum}
      </p>

      <div className={dotGraph__yZero} style={{ '--y': `${yZero * 100}%` } as React.CSSProperties} />
      <p className={dotGraph__xLabel} style={{ '--y': `${yZero * 100}%` } as React.CSSProperties}>
        {xProperties.title}
      </p>
      <p className={dotGraph__xMaxLabel} style={{ '--y': `${yZero * 100}%` } as React.CSSProperties}>
        {xMaximum}
      </p>

      {lines?.map(({ x1, x2, y1, y2 }) => {
        const smallX = x1 < x2 ? x1 : x2
        const largeX = x1 < x2 ? x2 : x1
        const smallY = y1 < y2 ? y1 : y2
        const largeY = y1 < y2 ? y2 : y1

        const relativeX1Position = (smallX - xMinimum) / (xMaximum - xMinimum)
        const relativeX2Position = (largeX - xMinimum) / (xMaximum - xMinimum)
        const relativeAbsX = Math.abs(relativeX2Position - relativeX1Position)

        const relativeY1Position = (smallY - yMinimum) / (yMaximum - yMinimum)
        const relativeY2Position = (largeY - yMinimum) / (yMaximum - yMinimum)
        const relativeAbsY = Math.abs(relativeY2Position - relativeY1Position)

        const relativeLineLength = Math.sqrt(relativeAbsX ** 2 + relativeAbsY ** 2)
        const lineAngle = -Math.atan2(relativeY2Position - relativeY1Position, relativeX2Position - relativeX1Position)

        return (
          <div
            className={dotGraph__line}
            style={
              {
                '--x': `${relativeX1Position * 100}%`,
                '--y': `${relativeY1Position * 100}%`,

                '--x2': `${relativeX2Position * 100}%`,
                '--y2': `${relativeY2Position * 100}%`,

                '--angle': `${lineAngle}rad`,
                '--length': `${relativeLineLength * 100}%`,
              } as React.CSSProperties
            }
          />
        )
      })}

      {dots.map(({ id, x, y }) => (
        <div
          key={id ? id : `${x},${y}`}
          className={dotGraph__dot}
          style={
            {
              '--x': `${((x - xMinimum) / (xMaximum - xMinimum)) * 100}%`,
              '--y': `${((y - yMinimum) / (yMaximum - yMinimum)) * 100}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default DotGraph
