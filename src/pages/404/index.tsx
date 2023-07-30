import { Link } from 'react-router-dom'

import FloatingLink from '../../components/link'

import style from './style.module.scss'

const Home = () => {
  return (
    <div className={style['home']}>
      <h1>Error 404: How did you get here?</h1>
      <div className={style['home__buttons']}>
        <Link to="/home">
          <FloatingLink label="Go Home" />
        </Link>
      </div>
    </div>
  )
}

export default Home
