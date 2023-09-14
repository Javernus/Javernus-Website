export default `
#ifdef GL_ES
precision highp float;
#endif
varying highp vec3 vColor;
varying highp vec3 vLighting;

void main(void) { gl_FragColor = vec4(vColor * vLighting, 1.0); }
`
