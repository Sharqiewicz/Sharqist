import { ReactElement } from 'react'
import { PathKeys, PATHS } from '../../router/paths'
import { InboxIcon, AddTaskIcon, TodayIcon } from '../../assets/icons'
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
  name: 'Add a task',
  icon: <AddTaskIcon />,
}

function Sidebar() {
  const SUBPAGES: Subpage[] = [ADD_TASK, TODAY, INBOX]

  return (
    <aside className='z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'>
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          {SUBPAGES.map(subpage => (
            <li>
              <a
                href={subpage.path}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                {subpage.icon}
                <div className='m-1'></div>
                {subpage.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export { Sidebar }
