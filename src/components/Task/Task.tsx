import { invoke } from '@tauri-apps/api'
import moment from 'moment'
import { ITask } from '../../interfaces/ITask'
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown'
import { PenIcon, TrashIcon } from '../../assets/icons'
import { CalendarIcon } from '../../assets/icons/CalendarIcon'
import { CheckIcon } from '../../assets/icons/CheckIcon'
import clickSound from '../../assets/sounds/pop.mp3'

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

  const setIsDone = async () => {
    await invoke('set_task_done', { id })
    const audio = new Audio(clickSound)
    audio.play()
    window.location.reload()
  }

  const setUndone = async () => {
    await invoke('set_task_undone', { id })
    const audio = new Audio(clickSound)
    audio.play()
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

  const renderIsDoneButton = () =>
    task.is_done ? (
      <button
        className='absolute -translate-y-1/2 -left-3 top-1/2'
        type='button'
        onClick={setUndone}
      >
        <CheckIcon fillColor='text-green-400 hover:text-red-400' />
      </button>
    ) : (
      <button
        className='absolute -translate-y-1/2 -left-3 top-1/2'
        type='button'
        onClick={setIsDone}
      >
        <CheckIcon />
      </button>
    )

  return (
    <div className='relative w-full p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      {renderIsDoneButton()}
      <Dropdown
        options={dropdownOptions}
        additionalStyles='absolute right-4 top-4 flex justify-end flex-col items-end cursor-pointer'
      />
      <div className='ml-5'>
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
    </div>
  )
}
