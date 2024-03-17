import Divider from '../../components/divider'
import { Slideshow, SlideshowItem } from '../../components/slideshow'

import { photography, photography__divider } from './style.module.scss'

const Photography = () => {
  return (
    <div className={photography}>
      <h1>Photography</h1>

      <p>
        I am a hobby photographer. I go out and take pictures of things that I find interesting. I love capturing single
        moments into a memory. I relish pictures of nature, a little bird that sat still for just long enough, a sunset
        that coloured the sky in colours of orange and pink, or flowers that now bloom for eternity in a photo.
      </p>

      <Divider className={photography__divider} />

      <h3>Highlights</h3>

      <Slideshow>
        <SlideshowItem />
        <SlideshowItem />
        <SlideshowItem />
        <SlideshowItem />
      </Slideshow>

      <p></p>
    </div>
  )
}

export default Photography
