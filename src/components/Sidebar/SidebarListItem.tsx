import { Subpage } from './Sidebar'

interface SidebarListItemProps {
  subpage: Subpage
}

const SidebarListItem = ({ subpage }: SidebarListItemProps) => (
  <li key={subpage.name}>
    <a
      href={subpage.path}
      className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
    >
      {subpage.icon}
      <div className='m-1'></div>
      <p className='font-h5'>{subpage.name}</p>
    </a>
  </li>
)

export { SidebarListItem }
