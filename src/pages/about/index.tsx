import FloatingLink from '../../components/link'

import style from './style.module.scss'

const Home = () => {
  return (
    <div className={style['home']}>
      <h1>Home</h1>
      <div className={style['home__buttons']}>
        <FloatingLink label="Button" />
        <FloatingLink label="Button" />
        <FloatingLink label="Button" />
      </div>
    </div>
  )
}

export default Home
