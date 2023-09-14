import type { Bivector, Vector } from './types'

import { dot } from './bivector'

const wedge3 = (a: Vector, b: Vector): Bivector => {
  return [
    a[0] * b[1] - a[1] * b[0], // XY
    a[0] * b[2] - a[2] * b[0], // XZ
    a[1] * b[2] - a[2] * b[1], // YZ
  ]
}

export class Rotor {
  bivector: Bivector = [0, 0, 0]

  scalar: number = 1

  constructor(bivector?: Bivector, scalar?: number) {
    this.bivector = bivector || this.bivector
    this.scalar = scalar || this.scalar
  }

  normalise = (): Rotor => {
    const length = Math.sqrt(this.bivector.reduce((accumulator, value) => accumulator + value * value, 0))

    this.scalar = this.scalar / length
    this.bivector = this.bivector.map(value => value / length) as Bivector

    return this
  }

  fromData = (bivector: Bivector, scalar: number): Rotor => {
    this.bivector = bivector || this.bivector
    this.scalar = scalar || this.scalar

    return this
  }

  fromVectorToVector = (vectorFrom: Vector, vectorTo: Vector): Rotor => {
    this.scalar = 1 + dot(vectorTo, vectorFrom)
    this.bivector = wedge3(vectorTo, vectorFrom)
    this.normalise()

    return this
  }

  fromPlaneAngle = (plane: Bivector, angle: number): Rotor => {
    const sineOfHalfAngle = -1 * Math.sin(angle / 2)
    this.scalar = Math.cos(angle / 2)
    this.bivector = plane.map(value => value * sineOfHalfAngle) as Bivector

    return this
  }

  // Multiply with another rotor
  multiply = (rotor: Rotor): Rotor => {
    const rotorScale =
      this.scalar * rotor.scalar -
      this.bivector[0] * rotor.bivector[0] -
      this.bivector[1] * rotor.bivector[1] -
      this.bivector[2] * rotor.bivector[2]

    const rotorBivector: Bivector = [
      this.bivector[0] * rotor.scalar +
        this.scalar * rotor.bivector[0] +
        this.bivector[2] * rotor.bivector[1] -
        this.bivector[1] * rotor.bivector[2],

      this.bivector[1] * rotor.scalar +
        this.scalar * rotor.bivector[1] -
        this.bivector[2] * rotor.bivector[0] +
        this.bivector[0] * rotor.bivector[2],

      this.bivector[2] * rotor.scalar +
        this.scalar * rotor.bivector[2] +
        this.bivector[1] * rotor.bivector[0] -
        this.bivector[0] * rotor.bivector[1],
    ]

    return new Rotor(rotorBivector, rotorScale)
  }

  rotate = (vector: Vector): Vector => {
    const IntermediateVector: Vector = [
      this.scalar * vector[0] + this.bivector[0] * vector[1] + this.bivector[1] * vector[2],

      this.scalar * vector[1] - this.bivector[0] * vector[0] + this.bivector[2] * vector[2],

      this.scalar * vector[2] - this.bivector[1] * vector[0] - this.bivector[2] * vector[1],
    ]

    const trivector = vector[0] * this.bivector[2] - vector[1] * this.bivector[1] + vector[2] * this.bivector[0]

    const RotatedVector: Vector = [
      this.scalar * IntermediateVector[0] +
        IntermediateVector[1] * this.bivector[0] +
        IntermediateVector[2] * this.bivector[1] +
        trivector * this.bivector[2],

      this.scalar * IntermediateVector[1] -
        IntermediateVector[0] * this.bivector[0] -
        trivector * this.bivector[1] +
        IntermediateVector[2] * this.bivector[2],

      this.scalar * IntermediateVector[2] +
        trivector * this.bivector[0] -
        IntermediateVector[0] * this.bivector[1] -
        IntermediateVector[1] * this.bivector[2],
    ]

    return RotatedVector
  }

  toRotationMatrix = () => {
    const unitVectors: [Vector, Vector, Vector] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]

    const unitVectorsRotated: [Vector, Vector, Vector] = unitVectors.map(unitVector => this.rotate(unitVector)) as [
      Vector,
      Vector,
      Vector,
    ]

    // prettier-ignore
    return [
      ...unitVectorsRotated[0],
      0,
      ...unitVectorsRotated[1],
      0,
      ...unitVectorsRotated[2],
      0,
      0,
      0,
      0,
      1,
    ]
  }
}
