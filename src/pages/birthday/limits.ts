export const limits = {
  lowerBound: (days: number) => {
    // Generate points at every d from 0 to days with 0.5 step
    // Of the function 100 * 0.632 * d * (d - 1) / (2 * days)

    const points: { x: number; y: number; colour: string; size: string }[] = []

    for (let x = 0; x <= days; x += 0.125) {
      const y = (100 * 0.632 * x * (x - 1)) / (2 * days)

      points.push({
        x,
        y,
        colour: 'var(--neutral-500)',
        size: '0.125rem',
      })

      if (y > 100) break
    }

    return points
  },
  upperBound: (days: number) => {
    // Generate points at every d from 0 to days with 0.5 step
    // Of the function 100 * d * (d - 1) / (2 * days)

    const points: { x: number; y: number; colour: string; size: string }[] = []

    for (let x = 0; x <= days; x += 0.125) {
      const y = (100 * x * (x - 1)) / (2 * days)

      points.push({
        x,
        y,
        colour: 'var(--neutral-500)',
        size: '0.125rem',
      })

      if (y > 100) break
    }

    return points
  },
}
