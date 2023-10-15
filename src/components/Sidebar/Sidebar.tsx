import { ReactElement, useMemo } from 'react'

import { PathKeys, PATHS } from '../../router/paths'
import {
  InboxIcon,
  AddTaskIcon,
  TodayIcon,
  ClockIcon,
} from '../../assets/icons'
import { useSidebar } from '../../hooks'

import { SidebarListItem } from './SidebarListItem'
export interface Subpage {
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

const HISTORY: Subpage = {
  path: PATHS.HISTORY,
  name: 'History',
  icon: <ClockIcon />,
}

const UPCOMING: Subpage = {
  path: PATHS.UPCOMING,
  name: 'Upcoming',
  icon: <ClockIcon />,
}

function Sidebar() {
  const SUBPAGES: Subpage[] = [ADD_TASK, INBOX, TODAY, HISTORY, UPCOMING]

  const subpages = useMemo(() => {
    const renderedSubpages = SUBPAGES.map(subpage => (
      <SidebarListItem key={subpage.name} subpage={subpage} />
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
