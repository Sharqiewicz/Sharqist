import moment from 'moment'
import { ITask } from '../../interfaces/ITask'
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown'
import { PenIcon, TrashIcon } from '../../assets/icons'
import { CalendarIcon } from '../../assets/icons/CalendarIcon'
import { invoke } from '@tauri-apps/api'

export const Task = (task: ITask) => {
  const { name, description, date, id } = task

  const isBeforeToday = moment(date).add(1, 'days').isBefore(moment())

  const dateClassName = `mb-3 font-normal  ${
    isBeforeToday ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
  }`

  const editTask = () => {}
  const deleteTask = async () => {
    await invoke('delete_task', { id })
    window.location.reload()
  }

  const dropdownOptions: DropdownOption[] = [
    {
      name: 'Edit',
      icon: PenIcon,
      onClick: editTask,
    },
    {
      name: 'Delete',
      icon: TrashIcon,
      onClick: deleteTask,
    },
  ]

  return (
    <div className='relative w-full p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <Dropdown
        options={dropdownOptions}
        additionalStyles='absolute right-4 top-4 flex justify-end flex-col items-end cursor-pointer'
      />
      <h1 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {name}
      </h1>
      <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
        {description}
      </p>
      <div className='flex'>
        <div className='box-border mr-2'>
          <CalendarIcon />
        </div>
        <p className={dateClassName}>{moment(date).format('LL')}</p>
      </div>
    </div>
  )
}
