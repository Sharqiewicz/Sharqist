import { ReactElement, useMemo } from 'react'
import { PathKeys, PATHS } from '../../router/paths'
import { InboxIcon, AddTaskIcon, TodayIcon } from '../../assets/icons'
import { useSidebar } from '../../hooks'
interface Subpage {
  path: PathKeys
  name: string
  icon: ReactElement
}

const INBOX: Subpage = {
  path: PATHS.INBOX,
  name: 'Inbox',
  icon: <InboxIcon />,
}

const TODAY: Subpage = {
  path: PATHS.TODAY,
  name: 'Today',
  icon: <TodayIcon />,
}

const ADD_TASK: Subpage = {
  path: PATHS.ADD_TASK,
  name: 'Add Task',
  icon: <AddTaskIcon />,
}

function Sidebar() {
  const SUBPAGES: Subpage[] = [ADD_TASK, TODAY, INBOX]

  const subpages = useMemo(() => {
    const renderedSubpages = SUBPAGES.map(subpage => (
      <li key={subpage.name}>
        <a
          href={subpage.path}
          className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
        >
          {subpage.icon}
          <div className='m-1'></div>
          {subpage.name}
        </a>
      </li>
    ))

    return renderedSubpages
  }, [SUBPAGES])

  const { isSidebarOpen } = useSidebar()

  const asideClass = `z-30 ${
    isSidebarOpen ? 'w-full' : 'w-0 sm:w-52'
  } top-0 h-screen fixed overflow-hidden duration-300 ease-in-out`

  return (
    <aside className={asideClass}>
      <div className='h-full px-3 py-4 bg-gray-50 dark:bg-gray-800'>
        <div className='flex mb-5 ms-2 md:me-24'>
          <img src='./sharqist.svg' className='h-8 me-3' alt='Sharqist Logo' />
          <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
            Sharqist
          </span>
        </div>
        <ul className='space-y-2 font-medium'>{subpages}</ul>
      </div>
    </aside>
  )
}

export { Sidebar }
