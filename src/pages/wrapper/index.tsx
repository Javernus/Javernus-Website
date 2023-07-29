import { Outlet } from 'react-router-dom'

import Navigation from '../../components/navigation'

const Page = ({ menuItems }: { menuItems: { title: string; href: string }[] }) => {
  return (
    <div>
      <Navigation menuItems={menuItems} />
      <Outlet />
    </div>
  )
}

export default Page
