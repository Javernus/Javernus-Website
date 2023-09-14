import type { Vector } from './types'

/**
 * Normalise a vector.
 */
export const normalise = (a: number[]): number[] => {
  const length = Math.sqrt(a.reduce((accumulator, value) => accumulator + value * value, 0))

  if (length === 0) return a.map(() => 0)

  return a.map(value => value / length)
}

export const dot = (a: number[], b: number[]): number => {
  if (a.length !== b.length) throw new Error('Vectors must be of the same length.')

  return a.reduce((accumulator, value, index) => accumulator + value * (b[index] as number), 0)
}

const cross = (u: Vector, v: Vector): Vector => {
  // Cross product of u and v.

  const x = u[1] * v[2] - u[2] * v[1]
  const y = u[2] * v[0] - u[0] * v[2]
  const z = u[0] * v[1] - u[1] * v[0]

  return [x, y, z]
}

const getAnyPerpendicularNormalVector = (vector: Vector): Vector => {
  const differentVector: Vector = [1, 0, 0]
  if (dot(vector, differentVector) === 1) {
    differentVector[0] = 0
    differentVector[1] = 1
  }

  return normalise(cross(vector, differentVector)) as Vector
}

export const bivectorFromVector = (vector: Vector) => {
  const vectorNormalised: Vector = normalise(vector) as Vector

  const v1 = getAnyPerpendicularNormalVector(vectorNormalised)
  const v2 = cross(vectorNormalised, v1)

  return cross(v1, v2)
}
