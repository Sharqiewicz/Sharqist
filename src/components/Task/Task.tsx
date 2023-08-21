import moment from 'moment'
import { ITask } from '../../interfaces/ITask'

export const Task = (task: ITask) => {
  const { name, description, date } = task

  const isBeforeToday = moment(date).isBefore(moment())
  const dateClassName = `mb-3 font-normal  ${
    isBeforeToday ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
  }`

  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <h1 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {name}
      </h1>
      <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
        {description}
      </p>
      <p className={dateClassName}>{moment(date).format('LL')}</p>
    </div>
  )
}
