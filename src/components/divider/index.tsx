import cl from 'clsx'

import { divider } from './style.module.scss'

const Divider = ({ className }: { className?: string }) => {
  return <div className={cl(divider, className)}></div>
}

export default Divider
