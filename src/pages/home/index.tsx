import Card from '../../components/card'
import CardBox from '../../components/cardBox'
import FloatingLink from '../../components/floating-link'

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
      <CardBox>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card</h2>
        </Card>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 2</h2>
        </Card>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 3</h2>
        </Card>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 4</h2>
        </Card>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 5</h2>
        </Card>
        <Card backgroundImage="https://images.unsplash.com/photo-1627308279478-4b3b8b0b0b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjEwNjR8MHwxfHNlYXJjaHwxfHxwcm9ncmVzc2V8ZW58MHx8fHwxNjI3MjU0NjY5&ixlib=rb-1.2.1&q=80&w=1080">
          <h2>Card 6</h2>
        </Card>
      </CardBox>
    </div>
  )
}

export default Home
