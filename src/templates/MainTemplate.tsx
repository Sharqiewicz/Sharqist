import { FC, ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Navbar } from '../components/Navbar/Navbar'

interface MainTemplateProps {
  children: ReactNode
}

const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
  return (
    <div className='min-h-full min-h-screen background-yellow'>
      <Navbar />
      <div className='h-16 sm:h-0'></div>
      <div className='flex flex-row'>
        <Sidebar />

        <main className='w-full p-5 sm:ml-56'>{children}</main>
      </div>
    </div>
  )
}

export { MainTemplate }
