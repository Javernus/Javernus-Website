import type SlideshowItem from './slideshow-item'

import { useEffect, useRef } from 'react'

import { slideshow } from './style.module.scss'

const Slideshow = ({ children }: { children: (typeof SlideshowItem)[] }) => {
  const items = useRef<(typeof SlideshowItem)[]>([])

  useEffect(() => {
    if (!children) return

    // Go through the children and add an ID to each one
    const childrenArray = Array.from(children)

    // Find the current displayed item and get the index
    const current = childrenArray.findIndex(child => child.props.current)

    childrenArray.forEach((child, index) => {
      items.current[index] = child
    })
  }, [children])

  return <div className={slideshow}>{children}</div>
}

export default Slideshow
