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
      <div className='container columns-2 flex flex-row'>
        <div className='basis-1/3'>
          <Sidebar />
        </div>

        <main className='basis-2/3'>{children}</main>
      </div>
    </div>
  )
}

export { MainTemplate }
