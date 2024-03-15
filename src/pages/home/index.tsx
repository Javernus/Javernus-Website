import cl from 'clsx'
import { Link } from 'react-router-dom'

import Card from '../../components/card'
import CardBox from '../../components/cardBox'
import FloatingLink from '../../components/link'

import {
  home,
  home__buttons,
  textColourBlack,
  textPosition,
  textPositionBottom,
  textPositionCenter,
  textPositionHcenter,
  textPositionLeft,
  textPositionTop,
} from './style.module.scss'

const Home = () => {
  return (
    <div className={home}>
      <h1>Home</h1>
      <div className={home__buttons}>
        <FloatingLink label="Button" />
        <FloatingLink label="Button" />
        <FloatingLink label="Button" />
      </div>
      <CardBox>
        <Link to="/rotors">
          <Card imageUrl="/images/home-rotors.jpg">
            <div className={cl(textPosition, textPositionBottom, textPositionHcenter)}>
              <h2>Rotors</h2>
            </div>
          </Card>
        </Link>
        <Link to="/birthday">
          <Card imageUrl="/images/home-birthday.jpg">
            <div className={cl(textPosition, textPositionTop, textPositionLeft)}>
              <h2 className={textColourBlack}>
                The Birthday
                <br />
                Problem
              </h2>
            </div>
          </Card>
        </Link>
        <Link to="/palette">
          <Card imageUrl="/images/home-palette.jpg">
            <div className={cl(textPosition, textPositionHcenter, textPositionCenter)}>
              <h2>Colour Palette</h2>
            </div>
          </Card>
        </Link>
        <Card imageUrl="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 4</h2>
        </Card>
        <Card imageUrl="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 5</h2>
        </Card>
        <Card imageUrl="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 6</h2>
        </Card>
      </CardBox>
    </div>
  )
}

export default Home
