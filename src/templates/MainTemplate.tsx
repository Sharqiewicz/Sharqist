import { FC, ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Navbar } from '../components/Navbar/Navbar'

interface MainTemplateProps {
  children: ReactNode
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='container flex flex-row'>
        <div className='basis-1/4'>
          <Sidebar />
        </div>

        <main className='basis-3/4'>{children}</main>
      </div>
    </div>
  )
}

export { MainTemplate }
