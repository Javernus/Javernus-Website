/* Computer Graphics, Assignment 2, Translations, Rotations and Scaling
 *
 * Description ..... Draw teapots that can be interactively rotated with the mouse
 * Created by ...... Daan Kruis
 * Original by ..... Paul Melis
 *
 * Student names: Merijn Laks, Jake Jongejans
 * Student numbers: 13992260, 13622552
 *
 */

import type { Bivector, Matrices, Matrix4, Program, RotorBuffers } from './data/types'

import { m4 } from 'twgl.js'

import { axisIndices } from './data/axis'
import { Rotor } from './data/rotor'
import shaderFrag from './data/shader.frag'
import shaderVert from './data/shader.vert'
import { teapotIndices } from './data/teapot'

const RotorInitGL = (
  gl: WebGLRenderingContext | null | undefined,
  size: { width: number; height: number },
  matrices: Matrices
): Program => {
  if (!gl) throw new Error('WebGLRenderingContext is null.')

  // Initialize OpenGl settings.
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.depthFunc(gl.LESS)
  gl.enable(gl.DEPTH_TEST)

  // Add fragment and vertex shaders to programram.
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
  const vertShader = gl.createShader(gl.VERTEX_SHADER)

  if (!fragShader || !vertShader) throw new Error('Failed to create shader.')

  gl.shaderSource(fragShader, shaderFrag)
  gl.compileShader(fragShader)

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    alert('Error while compiling fragment shader: ' + gl.getShaderInfoLog(vertShader))
  }

  gl.shaderSource(vertShader, shaderVert)
  gl.compileShader(vertShader)

  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    alert('Error while compiling vertex shader: ' + gl.getShaderInfoLog(vertShader))
  }

  const program: Partial<Program> = gl.createProgram()

  if (!program) throw new Error('Failed to create program.')

  gl.attachShader(program, vertShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert('Error while initialising shaders.')
  }

  gl.useProgram(program)

  // Get the location of the shader attributes and matrices.
  program.vertexPositionAttribute = gl.getAttribLocation(program, 'aVertexPosition')
  program.vertexNormalAttribute = gl.getAttribLocation(program, 'aVertexNormal')
  program.vertexColorAttribute = gl.getAttribLocation(program, 'aVertexColor')
  program.cMatrixUniform = gl.getUniformLocation(program, 'uCMatrix')
  program.pMatrixUniform = gl.getUniformLocation(program, 'uPMatrix')
  program.mvMatrixUniform = gl.getUniformLocation(program, 'uMVMatrix')
  program.nMatrixUniform = gl.getUniformLocation(program, 'uNMatrix')

  m4.lookAt([0.0, 12.0, 25.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0], matrices.camera)
  m4.inverse(matrices.camera, matrices.camera)

  const aspectRatio = size.width / size.height

  m4.perspective((90.0 / aspectRatio) * (Math.PI / 180), aspectRatio, 0.1, 100.0, matrices.perspective)

  return program as Program
}

function DrawRotatedTeapotRotor(rotation: number, rotationBivector: Bivector, matrices: Matrices) {
  const rotor = new Rotor()
  rotor.fromPlaneAngle(rotationBivector, rotation * (Math.PI / 180))

  matrices.modelView = m4.multiply(matrices.modelView, rotor.toRotationMatrix(), matrices.modelView) as Matrix4

  m4.inverse(matrices.modelView, matrices.normal)
  m4.transpose(matrices.normal, matrices.normal)

  return matrices.normal
}

function RotorDrawRotatedTeapot(
  gl: WebGLRenderingContext,
  rotation: number,
  rotationBivector: Bivector,
  buffers: RotorBuffers,
  matrices: Matrices,
  program: Program
) {
  if (!program) throw new Error('Program is null.')

  matrices.normal = DrawRotatedTeapotRotor(rotation, rotationBivector, matrices)

  // Bind matrices and teapot buffers to shaders.
  gl.uniformMatrix4fv(program.cMatrixUniform, false, matrices.camera)
  gl.uniformMatrix4fv(program.pMatrixUniform, false, matrices.perspective)
  gl.uniformMatrix4fv(program.mvMatrixUniform, false, matrices.modelView)
  gl.uniformMatrix4fv(program.nMatrixUniform, false, matrices.normal)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotVertexBuffer)
  gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexPositionAttribute)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotNormalBuffer)
  gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexNormalAttribute)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.teapotColorBuffer)
  gl.vertexAttribPointer(program.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexColorAttribute)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.teapotIndexBuffer)
  // Draw the teapot.
  gl.drawElements(gl.TRIANGLES, teapotIndices.length, gl.UNSIGNED_SHORT, 0)

  // We don't want to apply lighting to the axis.
  const nMat = m4.identity()
  gl.uniformMatrix4fv(program.nMatrixUniform, false, nMat)

  // Bind matrices and axis buffers to shaders.
  gl.lineWidth(2)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisVertexBuffer)
  gl.vertexAttribPointer(program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexPositionAttribute)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisNormalBuffer)
  gl.vertexAttribPointer(program.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexNormalAttribute)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.axisColorBuffer)
  gl.vertexAttribPointer(program.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(program.vertexColorAttribute)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.axisIndexBuffer)
  // Draw axis.
  gl.drawElements(gl.LINES, axisIndices.length, gl.UNSIGNED_SHORT, 0)
  gl.lineWidth(1)
}

function RotorDrawTeapots(
  gl: WebGLRenderingContext,
  rotation: number,
  rotationBivector: Bivector,
  buffers: RotorBuffers,
  matrices: Matrices,
  program: Program
) {
  matrices.modelView = m4.identity() as Matrix4
  RotorDrawRotatedTeapot(gl, rotation, rotationBivector, buffers, matrices, program)
}

export const RotorDrawGLScene = (
  gl: WebGLRenderingContext,
  size: { width: number; height: number },
  rotation: number,
  rotationBivector: Bivector,
  buffers: RotorBuffers,
  matrices: Matrices,
  program: Program
) => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.viewport(0, 0, size.width, size.height)

  RotorDrawTeapots(gl, rotation, rotationBivector, buffers, matrices, program)
}

export function RotorMain(
  gl: WebGLRenderingContext | null | undefined,
  size: { width: number; height: number },
  createNewProgram: boolean
): { matrices: Matrices; program: Program } {
  const matrices: Matrices = {
    camera: m4.identity() as Matrix4,
    perspective: m4.identity() as Matrix4,
    modelView: m4.identity() as Matrix4,
    normal: m4.identity() as Matrix4,
  }

  // Only continue if WebGL is available and working
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    return { matrices, program: null }
  }

  const program = createNewProgram ? RotorInitGL(gl, size, matrices) : null
  // RotorRenderLoop(gl, size, rotation, buffers, matrices, program)

  return { matrices, program }
}
