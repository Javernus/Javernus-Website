import type { HTMLAttributesAndProps } from '../../utilities/types'

import cl from 'clsx'

import { dotGraph, dotGraph__dot, dotGraph__xZero, dotGraph__yZero } from './style.module.scss'

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
  xRange,
  yRange,
  ...other
}: HTMLAttributesAndProps<
  HTMLDivElement,
  {
    xRange: { minimum?: number; maximum?: number }
    yRange: { minimum?: number; maximum?: number }
    dots: { x: number; y: number }[]
  }
>) => {
  const xMinimum = getNumber([xRange.minimum, getMinimum(dots, 'x') - 1])
  const xMaximum = getNumber([xRange.maximum, getMaximum(dots, 'x') + 1])

  const yMinimum = getNumber([yRange.minimum, getMinimum(dots, 'y') - 1])
  const yMaximum = getNumber([yRange.maximum, getMaximum(dots, 'y') + 1])

  const hasXZero = xMinimum <= 0 && xMaximum >= 0
  const hasYZero = yMinimum <= 0 && yMaximum >= 0

  console.log(xMinimum, xMaximum, yMinimum, yMaximum, hasXZero, hasYZero)

  const xZero = (0 - xMinimum) / (xMaximum - xMinimum)
  const yZero = (0 - yMinimum) / (yMaximum - yMinimum)

  const { className, ...otherProps } = other

  return (
    <div className={cl(dotGraph, className)} {...otherProps}>
      {hasXZero && <div className={dotGraph__xZero} style={{ '--x': `${xZero * 100}%` } as React.CSSProperties} />}

      {hasYZero && <div className={dotGraph__yZero} style={{ '--y': `${yZero * 100}%` } as React.CSSProperties} />}

      {dots.map(({ x, y }) => (
        <div
          className={dotGraph__dot}
          style={
            {
              '--x': `${((x - xMinimum) / (xMaximum - xMinimum + 1)) * 100}%`,
              '--y': `${((y - yMinimum) / (yMaximum - yMinimum + 1)) * 100}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default DotGraph
