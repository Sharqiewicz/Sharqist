import { Sidebar } from '../components/Sidebar/Sidebar'
import { Navbar } from '../components/Navbar/Navbar'

import './index.css'

function MainTemplate() {
  return (
    <div>
      <Navbar />
      <div className='container columns-2 flex flex-row'>
        <div className='basis-1/3'>
          <Sidebar />
        </div>

        <main className='basis-2/3'></main>
      </div>
    </div>
  )
}

export { MainTemplate }
