export type Vector = [number, number, number]

export type Bivector = [number, number, number]

export type Program =
  | (WebGLProgram & {
      vertexPositionAttribute: number
      vertexNormalAttribute: number
      vertexColorAttribute: number
      cMatrixUniform: WebGLUniformLocation | null
      pMatrixUniform: WebGLUniformLocation | null
      mvMatrixUniform: WebGLUniformLocation | null
      nMatrixUniform: WebGLUniformLocation | null
    })
  | null

export type RotorBuffers = {
  teapotVertexBuffer: WebGLBuffer | null
  teapotNormalBuffer: WebGLBuffer | null
  teapotColorBuffer: WebGLBuffer | null
  teapotIndexBuffer: WebGLBuffer | null

  axisVertexBuffer: WebGLBuffer | null
  axisNormalBuffer: WebGLBuffer | null
  axisColorBuffer: WebGLBuffer | null
  axisIndexBuffer: WebGLBuffer | null
}

// prettier-ignore
export type Matrix3 = [
  number, number, number,
  number, number, number,
  number, number, number,
]

// prettier-ignore
export type Matrix4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
]

export type Matrices = {
  camera: Matrix4
  perspective: Matrix4
  modelView: Matrix4
  normal: Matrix4
}
