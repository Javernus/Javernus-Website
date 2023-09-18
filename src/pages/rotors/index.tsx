import type { Bivector, Vector } from './data/types'
import type { ChangeEvent as ReactChangeEvent } from 'react'

import { useState } from 'react'

import { bivectorFromVector, normalise } from './data/bivector'
import GlCanvas from './canvas'

import {
  contextContainer,
  contextContainer__autoRotateButton,
  contextContainer__input,
  contextContainer__inputContainer,
  contextContainer__text,
} from './style.module.scss'

const Rotor = () => {
  const [inputValue, setInputValue] = useState<string>('[1, 0, 0]')

  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [rotation, setRotation] = useState<{ bivector: Bivector; vector: Vector }>({
    bivector: bivectorFromVector([1, 0, 0]),
    vector: [1, 0, 0],
  })

  const onVectorChange = (event: ReactChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)

    try {
      const vector: number[] = JSON.parse((event.target as HTMLInputElement)?.value).map((value: string) =>
        parseFloat(value)
      )

      if (vector.length !== 3) return
      if (vector.some(value => isNaN(value))) return

      setRotation({
        vector: normalise(vector) as Vector,
        bivector: bivectorFromVector(vector.map((v, i) => v * (i === 1 ? -1 : 1)) as Vector),
      })

      // setReloadNumber(reloadNumber + 1)
    } catch (error) {
      return
    }
  }

  return (
    <>
      <GlCanvas autoRotate={autoRotate} rotationVector={rotation.vector} rotationBivector={rotation.bivector} />

      <div className={contextContainer}>
        <p className={contextContainer__text}>
          A rotor is capable of rotating objects over a plane. This can be visualised by drawing the perpendicular
          vector to the plane. Because it is possible to choose <i>any</i> plane (or vector), it is possible to rotate
          objects in any direction, without encountering gimbal lock.
        </p>
        <p className={contextContainer__text}>Choose a vector around which to rotate.</p>
        <div className={contextContainer__inputContainer}>
          <input className={contextContainer__input} onChange={onVectorChange} type="text" value={inputValue} />
          <p
            className={contextContainer__autoRotateButton}
            onClick={() => {
              setAutoRotate(!autoRotate)
            }}
          >
            {autoRotate ? 'Stop' : 'Start'} automatic rotation
          </p>
        </div>
      </div>
    </>
  )
}

export default Rotor
