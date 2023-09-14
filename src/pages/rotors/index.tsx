import type { Vector } from './data/types'
import type { ChangeEvent as ReactChangeEvent } from 'react'

import { useEffect, useRef, useState } from 'react'

import { normalise } from './data/bivector'
import { RotorInitBuffers } from './data/buffers'
import { RotorMain } from './main'

import {
  contextContainer,
  contextContainer__autoRotateButton,
  contextContainer__input,
  contextContainer__inputContainer,
  contextContainer__text,
  glCanvas as glCanvasStyle,
} from './style.module.scss'

const Rotor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [currentMousePositionX, setCurrentMousePositionX] = useState<number>(0)

  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [rotate, setRotate] = useState<boolean>(false)
  const [rotation, setRotation] = useState<number>(0)
  const [rotationVector, setRotationVector] = useState<Vector>([1, 0, 0])
  // const [rotationBivector, setRotationBivector] = useState<Bivector>(bivectorFromVector(rotationVector))

  useEffect(() => {
    if (!canvasRef.current) return

    const g = canvasRef.current.getContext('webgl')

    if (!g) return

    const size = { width: canvasRef.current.clientWidth, height: canvasRef.current.clientHeight }

    RotorInitBuffers(g, rotationVector)

    RotorMain(g, size, autoRotate)
  }, [autoRotate, rotationVector])

  const onVectorChange = (event: ReactChangeEvent<HTMLInputElement>) => {
    try {
      const vector: number[] = JSON.parse((event.target as HTMLInputElement)?.value).map((value: string) =>
        parseFloat(value)
      )

      if (vector.length !== 3) return
      if (vector.some(value => isNaN(value))) return

      setRotationVector(normalise(vector) as Vector)
      // setRotationBivector(bivectorFromVector(rotationVector.map((v, i) => v * (i === 1 ? -1 : 1)) as Vector))

      setRotation(0)
    } catch (error) {
      return
    }
  }

  const rotorMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setCurrentMousePositionX(event.clientX)
    setRotate(true)
  }

  const rotorMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!rotate) return

    const delta = event.clientX - currentMousePositionX
    setRotation(rotation + delta)
    setCurrentMousePositionX(event.clientX)
  }

  const rotorMouseUp = () => {
    setRotate(false)
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={rotorMouseDown}
        onMouseMove={rotorMouseMove}
        onMouseUp={rotorMouseUp}
        className={glCanvasStyle}
        width="800"
        height="600"
      ></canvas>

      <div className={contextContainer}>
        <p className={contextContainer__text}>
          A rotor is capable of rotating objects over a plane. This can be visualised by drawing the perpendicular
          vector to the plane. Because it is possible to choose <i>any</i>* plane, it is possible to rotate objects in
          any direction, without encountering gimbal lock. *(0, 0, 0) excepted.
        </p>
        <p className={contextContainer__text}>Choose vector around which to rotate.</p>
        <div className={contextContainer__inputContainer}>
          <input className={contextContainer__input} onChange={onVectorChange} type="text" value="[1,0,0]" />
          <p
            className={contextContainer__autoRotateButton}
            onClick={() => {
              setAutoRotate(!autoRotate)
            }}
          >
            {autoRotate ? 'Auto rotate on' : 'Auto rotate off'}
          </p>
        </div>
      </div>
    </>
  )
}

export default Rotor
