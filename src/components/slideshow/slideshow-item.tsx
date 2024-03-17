import { slideshowItem } from './style.module.scss'

const SlideshowItem = ({ index }: { index: number }) => {
  // Create a public method to set the index and one to get the index

  return <div className={slideshowItem}></div>
}

export default SlideshowItem
