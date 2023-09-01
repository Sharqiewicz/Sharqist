import { FC, ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Navbar } from '../components/Navbar/Navbar'

interface MainTemplateProps {
  children: ReactNode
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='h-16 sm:h-0'></div>
      <div className='container flex flex-row'>
        <div className=''>
          <Sidebar />
        </div>

        <main className='w-full p-5'>{children}</main>
      </div>
    </>
  )
}

export { MainTemplate }
