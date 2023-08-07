function Sidebar() {
  const SUBPAGES = [{ href: '' }]

  return (
    <aside className='z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'>
      <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          {SUBPAGES.map(subpage => (
            <li>
              <a
                href={subpage.href}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                A
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export { Sidebar }
