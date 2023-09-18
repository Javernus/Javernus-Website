import type { Bivector, Matrices, Program, RotorBuffers, Vector } from './data/types'

import { useEffect, useRef, useState } from 'react'

import { RotorInitBuffers } from './data/buffers'
import { RotorDrawGLScene, RotorMain } from './main'

import { glCanvas as glCanvasStyle } from './style.module.scss'

type GlProgram = {
  gl: WebGLRenderingContext
  program: Program
  matrices: Matrices
  buffers: RotorBuffers
  size: { width: number; height: number }
}

const GlCanvas = ({
  autoRotate,
  rotationBivector,
  rotationVector,
}: {
  autoRotate: boolean
  rotationVector: Vector
  rotationBivector: Bivector
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [loaded, setLoaded] = useState<boolean>(false)
  const [timing, setTiming] = useState<number>(0)
  const [rotation, setRotation] = useState<number>(0)
  const [glProgram, setGlProgram] = useState<GlProgram>()

  useEffect(() => {
    const renderLoop = () => {
      setTiming(t => t + 1)
      if (!glProgram) return
      setRotation(r => (autoRotate ? r + 0.5 : r))

      RotorDrawGLScene(
        glProgram.gl,
        glProgram.size,
        rotation,
        rotationBivector,
        glProgram.buffers,
        glProgram.matrices,
        glProgram.program
      )
    }

    setTimeout(renderLoop, 1000 / 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timing])

  useEffect(() => {
    setRotation(0)
  }, [rotationVector])

  useEffect(() => {
    setGlProgram(glP => {
      if (!canvasRef.current) return glP

      const gl = canvasRef.current.getContext('webgl')

      if (!gl) return glP

      const size = { width: 800, height: 600 }
      const buffers = RotorInitBuffers(gl, rotationVector)
      const { matrices, program } = RotorMain(gl, size, true)

      return {
        gl,
        program,
        matrices,
        buffers,
        size,
      }
    })

    if (!loaded) setLoaded(true)
  }, [loaded, rotationVector, rotationBivector])

  return <canvas ref={canvasRef} className={glCanvasStyle} width="800px" height="600px"></canvas>
}

export default GlCanvas
