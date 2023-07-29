export const getMousePosition = (event: MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  return { x, y }
}

export const getRelativeMousePosition = (event: MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y }
}

export const isMouseInsideElement = (event: MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const x = event.clientX
  const y = event.clientY
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export const unsetMousePosition = (element: HTMLElement) => {
  element.style.removeProperty('--mouse-x')
  element.style.removeProperty('--mouse-y')
}

export const setMousePosition = (element: HTMLElement, mousePosition: { x: number; y: number }) => {
  element.style.setProperty('--mouse-x', mousePosition.x.toString())
  element.style.setProperty('--mouse-y', mousePosition.y.toString())
}
