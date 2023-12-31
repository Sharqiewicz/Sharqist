import { FC, useState } from 'react'

export interface DropdownOption {
  name: string
  icon: () => JSX.Element
  onClick: () => void
}
interface DropdownProps {
  options: DropdownOption[]
  additionalStyles?: string
}

const Dropdown: FC<DropdownProps> = ({ options, additionalStyles = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen(state => !state)
  }

  return (
    <div
      className={additionalStyles}
      onMouseEnter={toggleIsOpen}
      onMouseLeave={toggleIsOpen}
    >
      <button
        id='dropdownMenuIconHorizontalButton'
        data-dropdown-toggle='dropdownDotsHorizontal'
        className={`
                    inline-flex
                    items-center
                    p-2
                    text-sm
                    font-medium
                    text-center
                    text-gray-900
                    rounded-lg
                    focus:ring-4
                    focus:outline-none
                    text-white
                    focus:ring-gray-50
                    focus:ring-gray-600
                    ${isOpen ? 'bg-gray-700' : 'bg-gray-800'}
                `}
        type='button'
      >
        <svg
          className='w-5 h-5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 16 3'
        >
          <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
        </svg>
      </button>

      {isOpen ? renderDropdownOptions(options) : <></>}
    </div>
  )
}

const renderDropdownOptions = (options: DropdownOption[]) => (
  <div
    id='dropdownDotsHorizontal'
    className={`
            z-10
            bg-white
            divide-y
            divide-gray-100
            rounded-lg
            shadow
            w-40
            px-2
            dark:bg-gray-700
            dark:divide-gray-600
        `}
  >
    <ul
      className={`
                py-2
                text-sm
                text-gray-700
                dark:text-gray-200
            `}
      aria-labelledby='dropdownMenuIconHorizontalButton'
    >
      {options.map(option => (
        <li
          key={option.name}
          className={`
            box-border
            px-5
            p-2
            flex
            rounded-lg
            items-center
            justify-between
            hover:bg-gray-100
            dark:hover:bg-gray-600
            dark:hover:text-white
        `}
          onClick={option.onClick}
        >
          {option.icon()}
          <p
            className={`
                        block
                    `}
          >
            {option.name}
          </p>
        </li>
      ))}
    </ul>
  </div>
)
export { Dropdown }
