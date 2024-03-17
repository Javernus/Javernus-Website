import Divider from '../../components/divider'

import { books, books__divider } from './style.module.scss'

const Books = () => {
  return (
    <div className={books}>
      <h1>Writing is Art</h1>

      <Divider className={books__divider} />

      <p>
        For as long as I can remember, and even before then, writing has been a part of my life. I have created many
        worlds and so many stories within them. Some of these worlds are disjunct, even just singular places. Escapes
        from reality. Others have been considered for a long time, thoughts collected, parsed and combined to form a
        whole in which a story could take place.
      </p>

      <Divider className={books__divider} />

      <h3>Ame</h3>

      <p>
        Ame has possibly received the most time of all. I have collected thoughts on magic, politics, history and much,
        much more before I put a pen to paper to write the first paragraph of this book.
      </p>

      <p></p>
    </div>
  )
}

export default Books
