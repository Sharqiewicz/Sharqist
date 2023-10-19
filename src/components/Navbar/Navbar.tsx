import { useSidebar } from '../../hooks'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { openSidebar, closeSidebar, isSidebarOpen } = useSidebar()
  return renderNavbar(openSidebar, closeSidebar, isSidebarOpen)
}

const renderNavbar = (
  openSidebar: () => void,
  closeSidebar: () => void,
  isSidebarOpen: boolean,
) => (
  <nav className='fixed z-40 w-full h-16 bg-white border-b border-gray-200 sm:w-0 dark:bg-gray-800 dark:border-gray-700'>
    <div className='px-3 py-3 lg:px-5 lg:pl-3'>
      <div className='flex items-center justify-between'>
        {!isSidebarOpen && (
          <div className='flex items-center justify-start rtl:justify-end'>
            <button
              onClick={openSidebar}
              data-drawer-target='logo-sidebar'
              data-drawer-toggle='logo-sidebar'
              aria-controls='logo-sidebar'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  clipRule='evenodd'
                  fillRule='evenodd'
                  d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                ></path>
              </svg>
            </button>
          </div>
        )}
        {isSidebarOpen && (
          <>
            <div className='flex'>
              <img
                src='./sharqist.svg'
                className='h-8 me-3'
                alt='Sharqist Logo'
              />
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                Sharqist
              </span>
            </div>
            <div className='flex items-center justify-start rtl:justify-end'>
              <button
                onClick={closeSidebar}
                data-drawer-target='logo-sidebar'
                data-drawer-toggle='logo-sidebar'
                aria-controls='logo-sidebar'
                type='button'
                className='inline-flex items-center p-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              >
                <span className='sr-only'>Close sidebar</span>
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </nav>
)

export { Navbar }
