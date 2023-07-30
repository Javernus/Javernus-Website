import type { ReactNode } from 'react'

import { Outlet } from 'react-router-dom'

import Navigation from '../../components/navigation'

const Page = ({ children, menuItems }: { menuItems: { title: string; href: string }[]; children?: ReactNode }) => {
  return (
    <div>
      <Navigation menuItems={menuItems} />
      {children ? children : <Outlet />}
    </div>
  )
}

export default Page
