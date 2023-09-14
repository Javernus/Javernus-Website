import type { RotorBuffers, Vector } from './types'

import { axisIndices, axisNormals, rotorColours } from './axis'
import { normalise } from './bivector'
import { teapotColors, teapotIndices, teapotNormals, teapotVertices } from './teapot'

const buffers: Partial<RotorBuffers> = {}

export const RotorInitBuffers = (gl: WebGLRenderingContext | null | undefined, vector: Vector): RotorBuffers => {
  if (!gl) throw new Error('WebGLRenderingContext is null.')

  // Initialize vertex, normal, color and indices buffers for the teapot.
  buffers.teapotVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotVertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotVertices), gl.STATIC_DRAW)

  buffers.teapotNormalBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotNormalBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotNormals), gl.STATIC_DRAW)

  buffers.teapotColorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotColorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotColors), gl.STATIC_DRAW)

  buffers.teapotIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.teapotIndexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(teapotIndices), gl.STATIC_DRAW)

  // Initialize vertex, normal, color and indices buffers for the axis.
  buffers.axisVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisVertexBuffer)
  // prettier-ignore
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,
      0.0,
      0.0,
      ...normalise(vector)
        .map((v) => v * 10.0)
        .reverse(),
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
    ]),
    gl.STATIC_DRAW
  )

  buffers.axisNormalBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisNormalBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisNormals), gl.STATIC_DRAW)

  buffers.axisColorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisColorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rotorColours), gl.STATIC_DRAW)

  buffers.axisIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.axisIndexBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(axisIndices), gl.STATIC_DRAW)

  // Unbind the buffers.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return buffers as RotorBuffers
}
